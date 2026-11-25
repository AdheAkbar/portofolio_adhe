"""Uji perilaku hasil build di Chromium: npm run build, lalu python tests/verify-behavior.py"""
import functools
import http.server
import threading
from pathlib import Path

from playwright.sync_api import expect, sync_playwright

DIST = Path(__file__).resolve().parent.parent / 'dist'


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=str(DIST)))
threading.Thread(target=server.serve_forever, daemon=True).start()
URL = f'http://127.0.0.1:{server.server_port}/'
WIDTHS = [(320, 640), (360, 800), (390, 844), (768, 1024), (1024, 768), (1440, 900)]
MAIN = ['profil', 'ringkasan', 'github-showcase', 'bappeda', 'cv-lengkap', 'kontak']


def open_page(browser, width, height, **context):
    ctx = browser.new_context(viewport={'width': width, 'height': height}, accept_downloads=True, **context)
    page = ctx.new_page()
    problems = []
    page.on('pageerror', lambda e: problems.append(f'pageerror: {e}'))
    page.on('console', lambda m: m.type in ('error', 'warning') and problems.append(f'{m.type}: {m.text}'))
    page.on('response', lambda r: r.status >= 400 and problems.append(f'{r.status}: {r.url}'))
    page.goto(URL, wait_until='networkidle')
    if context.get('java_script_enabled', True):
        page.mouse.move(5, 5)  # interaksi pertama mengaktifkan React
        page.wait_for_function("'ready' in document.documentElement.dataset")
    return ctx, page, problems


def check_layout(page, label):
    data = page.evaluate('''() => ({
        overflow: document.documentElement.scrollWidth - innerWidth,
        h1: document.querySelectorAll('h1').length,
        noAlt: [...document.images].filter(i => !i.hasAttribute('alt')).length,
        unnamed: [...document.querySelectorAll('a,button')].filter(e => !(e.getAttribute('aria-label') || e.textContent.trim())).length,
        small: [...document.querySelectorAll('a,button,summary')].filter(e => e.checkVisibility()).filter(e => {
            const r = e.getBoundingClientRect(); return r.width > 1 && r.height < 43.5; }).map(e => e.textContent.trim()),
        tiny: [...document.querySelectorAll('main p, main dd, main dt, main li, main td, main span, main figcaption')]
            .filter(e => e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && !e.closest('.sr-only') && e.checkVisibility())
            .filter(e => parseFloat(getComputedStyle(e).fontSize) < 12).map(e => e.textContent.trim()),
        clipped: [...document.querySelectorAll('main h1, main h2, main h3, main p, main dd, main td, main a, main button')]
            .filter(e => e.checkVisibility() && !e.closest('.sr-only, .night .stream') && e.getBoundingClientRect().width > 1)
            .filter(e => { const r = e.getBoundingClientRect(); return r.right > innerWidth + 1 || r.left < -1; }).map(e => e.textContent.trim().slice(0, 40)),
        badAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.querySelector(a.getAttribute('href'))).map(a => a.hash),
    })''')
    assert data == {'overflow': 0, 'h1': 1, 'noAlt': 0, 'unnamed': 0, 'small': [], 'tiny': [], 'clipped': [], 'badAnchors': []}, (label, data)


def check_contrast(page, label):
    """Kontras teks terhadap latar solid terdekat (WCAG AA)."""
    bad = page.evaluate('''() => {
        const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        const rgb = c => { cv.clearRect(0,0,1,1); cv.fillStyle = c; cv.fillRect(0,0,1,1); return [...cv.getImageData(0,0,1,1).data]; };
        const lum = ([r,g,b]) => { const f = v => { v /= 255; return v <= .03928 ? v/12.92 : ((v+.055)/1.055)**2.4; }; return .2126*f(r)+.7152*f(g)+.0722*f(b); };
        const bg = e => { for (; e; e = e.parentElement) { const g = e.matches('mark, .facts span') && getComputedStyle(e).backgroundImage.match(/rgba?[(][^)]+[)]/); if (g) return rgb(g[0]); const c = rgb(getComputedStyle(e).backgroundColor); if (c[3] > 200) return c; } return [255,255,255,255]; };
        const out = [];
        for (const e of document.querySelectorAll('header *, main *, footer *')) {
            if (!e.checkVisibility() || e.closest('svg') || e.closest('.sr-only') || ![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
            const s = getComputedStyle(e), px = parseFloat(s.fontSize), big = px >= 24 || (px >= 18.66 && +s.fontWeight >= 700);
            const a = lum(rgb(s.color)), b = lum(bg(e)), ratio = (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
            if (ratio < (big ? 3 : 4.5)) out.push([ratio.toFixed(2), e.textContent.trim().slice(0, 40)]);
        }
        return out;
    }''')
    assert not bad, (label, bad)


def check_images(page, label):
    page.evaluate('document.querySelectorAll("img").forEach(i => i.loading = "eager")')
    page.wait_for_function('[...document.images].every(i => i.complete)')
    broken = page.evaluate('[...document.images].filter(i => !i.naturalWidth).map(i => i.src)')
    assert not broken, (label, broken)


def overflow_y(page):
    return page.evaluate('getComputedStyle(document.documentElement).overflowY')


def check_dialog(page, trigger, dialog):
    trigger.click()
    expect(dialog).to_be_visible()
    assert page.evaluate('!!document.activeElement.closest("dialog[open]")'), 'fokus awal harus di dialog'
    assert overflow_y(page) == 'hidden'
    for _ in range(12):
        page.keyboard.press('Tab')
        # Dialog native boleh melepas fokus ke antarmuka peramban (body), bukan ke halaman di belakangnya.
        assert page.evaluate('document.activeElement === document.body || !!document.activeElement.closest("dialog[open]")')
    dialog.get_by_role('button', name='Tutup dialog').focus()
    page.keyboard.press('Escape')
    expect(dialog).to_be_hidden()
    expect(trigger).to_be_focused()
    assert overflow_y(page) != 'hidden'


def check_nav(page, width):
    for section in MAIN:
        if width >= 1024:
            page.locator(f'header nav[aria-label="Navigasi utama"] a[href="#{section}"]').click()
        else:
            page.get_by_role('button', name='Isi halaman').click()
            page.locator(f'#daftar-isi a[href="#{section}"]').click()
            expect(page.locator('#daftar-isi')).to_be_hidden()
        page.wait_for_function('''id => {
            const y = document.getElementById(id).getBoundingClientRect().top;
            const end = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
            return end || (y >= 0 && y < 160);
        }''', arg=section, timeout=8000)
        page.wait_for_function('id => document.querySelector(`header nav a[href="#${id}"][aria-current]`)', arg=section)


def check_toc_keyboard(page):
    button = page.get_by_role('button', name='Isi halaman')
    button.focus()
    page.keyboard.press('Enter')
    expect(page.locator('#daftar-isi')).to_be_visible()
    assert page.locator('#daftar-isi a').count() == 16
    page.keyboard.press('Tab')
    assert page.evaluate('!!document.activeElement.closest("#daftar-isi")')
    page.keyboard.press('Escape')
    expect(page.locator('#daftar-isi')).to_be_hidden()
    expect(button).to_be_focused()


def check_results(page):
    links = page.locator('#peta-posisi li a')
    assert links.count() == 10, links.count()
    for link in links.all():
        assert page.locator(link.get_attribute('href')).count() == 1, link.get_attribute('href')
    expect(page.locator('#peta-posisi').get_by_role('button', name='Semua')).to_have_count(0)


def check_filters(page):
    page.locator('summary', has_text='Arsip proyek').click()
    for group_name, rows in [('Saring repositori', page.get_by_role('group', name='Daftar repositori').locator('li')), ('Saring dokumen', page.locator('#sertifikat ul li'))]:
        chips = page.get_by_role('group', name=group_name).get_by_role('button')
        count_of = lambda chip: int(chip.inner_text().rsplit('(', 1)[1].rstrip(')'))
        for chip in chips.all():
            chip.evaluate('e => e.click()')
            expect(rows).to_have_count(count_of(chip))
            expect(chip).to_have_attribute('aria-pressed', 'true')
        assert sum(map(count_of, chips.all()[1:])) == count_of(chips.first)
        chips.first.evaluate('e => e.click()')


def check_gallery(page):
    buttons = page.get_by_role('group', name='Pilih dokumentasi').get_by_role('button')
    buttons.nth(1).click()
    expect(page.locator('#bappeda-publikasi figcaption')).to_contain_text('dipublikasikan')
    buttons.nth(0).click()


INNER = ['karya-affiliate', 'karya-adhebank', 'pkm-vaganza', 'bappeda-publikasi', 'bappeda-talent']


def check_inner_anchors(ctx):
    """Anchor di dalam section mendarat tepat, lewat interaksi maupun tautan langsung."""
    for anchor in INNER:
        for direct in (False, True):
            page = ctx.new_page()
            page.goto(URL + (f'#{anchor}' if direct else ''), wait_until='networkidle')
            if not direct:
                page.keyboard.press('Shift')
                page.evaluate('id => { location.hash = id; }', anchor)
            page.wait_for_function('id => { const y = document.getElementById(id).getBoundingClientRect().top; return y >= 0 && y < 170; }', arg=anchor, timeout=8000)
            page.close()


def check_marquee(page):
    x = "new DOMMatrix(getComputedStyle(document.querySelector('.marquee-track')).transform).e"
    page.locator('.marquee').scroll_into_view_if_needed()
    page.mouse.move(0, 0)
    a = page.evaluate(x)
    page.wait_for_timeout(500)
    assert page.evaluate(x) > a, 'logo harus bergerak dari kiri ke kanan'
    page.get_by_role('button', name='Hentikan gerakan').click()
    expect(page.locator('.marquee')).to_have_attribute('data-paused', 'true')
    page.wait_for_timeout(200)  # beri waktu satu bingkai setelah gaya berubah
    a = page.evaluate(x)
    page.wait_for_timeout(300)
    assert page.evaluate(x) == a, 'logo harus bisa dihentikan'
    assert page.locator('.marquee img[alt]:not([alt=""])').count() == 11


def check_download(page):
    with page.expect_download() as info:
        page.locator('#hero').get_by_role('link', name='Unduh CV').click()
    assert Path(info.value.path()).read_bytes() == (DIST / 'assets' / 'CV_M_Adhe_Akbar_ATS.pdf').read_bytes()


def check_clipboard(page, ok):
    stub = '() => Promise.resolve()' if ok else '() => Promise.reject(new Error("ditolak"))'
    page.evaluate(f'Object.defineProperty(navigator, "clipboard", {{ configurable: true, value: {{ writeText: {stub} }} }})')
    page.get_by_role('button', name='Salin email').click()
    expect(page.locator('#kontak [role=status]')).to_contain_text('tersalin' if ok else 'gagal disalin')


with sync_playwright() as p:
    browser = p.chromium.launch()
    for width, height in WIDTHS:
        ctx, page, problems = open_page(browser, width, height)
        check_layout(page, width)
        check_images(page, width)
        check_nav(page, width)
        check_toc_keyboard(page)
        check_results(page)
        check_filters(page)
        check_gallery(page)
        check_marquee(page)
        check_download(page)
        check_dialog(page, page.locator('header').get_by_role('button', name='CV'), page.locator('dialog', has_text='Unduh PDF'))
        check_dialog(page, page.locator('#sertifikat ul button').first, page.locator('dialog', has_text='Buka berkas asli'))
        check_clipboard(page, True)
        check_clipboard(page, False)
        assert not problems, (width, problems)
        ctx.close()
        print('ok', width)

    for width, height in [(390, 844), (1440, 900)]:
        ctx, page, _ = open_page(browser, width, height)
        check_inner_anchors(ctx)
        ctx.close()
    print('ok anchor dalam')

    ctx, page, _ = open_page(browser, 390, 844, reduced_motion='reduce')
    state = page.evaluate('''() => ({
        reveal: document.documentElement.classList.contains('reveal-on'),
        hidden: [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity !== '1').length,
        smooth: getComputedStyle(document.documentElement).scrollBehavior,
        running: document.getAnimations().filter(a => a.playState === 'running').length,
    })''')
    assert state == {'reveal': False, 'hidden': 0, 'smooth': 'auto', 'running': 0}, state
    page.evaluate('document.querySelectorAll("details").forEach(d => d.open = true)')
    check_contrast(page, 'semua disclosure terbuka')
    ctx.close()
    print('ok reduced motion dan kontras')

    # Klik pertama terjadi sebelum React aktif: tidak boleh hilang.
    ctx = browser.new_context(viewport={'width': 390, 'height': 844})
    page = ctx.new_page()
    page.goto(URL, wait_until='networkidle')
    assert 'ready' not in page.evaluate('({...document.documentElement.dataset})'), 'React tidak boleh aktif saat muat'
    page.locator('header').get_by_role('button', name='CV').click()
    expect(page.locator('dialog', has_text='Unduh PDF')).to_be_visible()
    page.keyboard.press('Escape')
    page.wait_for_timeout(300)
    expect(page.locator('dialog[open]')).to_have_count(0)
    ctx.close()
    print('ok klik sebelum React aktif')

    # Tanpa JavaScript, isi dan CV tetap tersedia dari HTML prerender.
    ctx, page, _ = open_page(browser, 390, 844, java_script_enabled=False)
    expect(page.locator('#kontak h2')).to_be_visible()
    assert page.locator('#hero a[download]').count() == 1
    ctx.close()
    print('ok tanpa JavaScript')

    # Gambar gagal: dialog harus mengaku gagal dan tidak menampilkan dokumen lain.
    ctx, page, _ = open_page(browser, 1024, 768)
    page.route('**/cert-bnsp-*.webp', lambda r: r.abort())
    page.locator('#sertifikat ul button', has_text='KKNI Level II').click()
    expect(page.get_by_role('alert')).to_contain_text('gagal dimuat')
    assert page.locator('dialog[open] img').count() == 0
    ctx.close()
    print('ok gambar gagal')

    for width, font_size in [(720, '100%'), (1440, '200%'), (390, '200%')]:
        ctx, page, _ = open_page(browser, width, 900)
        page.add_style_tag(content=f'html{{font-size:{font_size}}} body{{font-family:Arial,sans-serif !important}}')
        over = page.evaluate('document.documentElement.scrollWidth - innerWidth')
        assert over <= 0, ('overflow', width, font_size, over)
        ctx.close()
    print('ok zoom dan font fallback')
    browser.close()
print('Semua uji perilaku lulus.')
