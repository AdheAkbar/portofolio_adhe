import { useRef, useState, type RefObject } from 'react';
import { Check, ChevronDown, RotateCcw } from 'lucide-react';
import { CONTACT, EVIDENCE, OTHER_PROJECTS, REPO_KINDS, REPO_SNAPSHOT_DATE, REPOS, repoUrl, type RepoKind } from '../data/portfolioData';
import { EvidenceButton, idx, OutLink, replay, Section, Tech } from '../lib/ui';

const FLOW = [
  ['Unggah dokumen', 'Sertifikat atau CV dalam format PDF maupun gambar.'],
  ['Pembacaan isi', 'Teks diekstraksi, termasuk dari dokumen hasil pindai dengan bantuan AI.'],
  ['Pengisian kolom', 'Data ditempatkan sesuai konteks kolom pada formulir.'],
  ['Pemeriksaan pengguna', 'Hijau menandai data yang yakin, kuning perlu diperiksa. Pengiriman tetap dilakukan pengguna.'],
];

// Posisi kolom pada gambar halaman uji, dalam persen.
const FIELDS = [
  { top: '20.6%', left: '18.5%', width: '63.5%', height: '4.4%', ok: true },
  { top: '29.7%', left: '18.5%', width: '46%', height: '4.4%', ok: true },
  { top: '41.6%', left: '18.5%', width: '46%', height: '4.4%', ok: true },
  { top: '55.6%', left: '18.5%', width: '31%', height: '4.4%', ok: false },
  { top: '69.6%', left: '18.5%', width: '31%', height: '4.4%', ok: false },
];

const Replay = ({ target }: { target: RefObject<HTMLElement | null> }) => (
  <button type="button" className="link motion-reduce:hidden" onClick={() => target.current && replay(target.current)}>Putar ulang <RotateCcw aria-hidden="true" /></button>
);

const PIPE = ['Tautan produk', 'Riset fakta', 'Hook', 'Naskah', 'Teleprompter'];
const SCENES = [
  ['Hook', 'Pembuka yang menarik perhatian'],
  ['Masalah', 'Kebutuhan yang dialami penonton'],
  ['Bukti', 'Fakta produk yang bersumber'],
  ['Ajakan', 'Arahan sesuai platform'],
];
const GATES = ['Klaim ditautkan pada fakta produk', 'Pembuka dibatasi maksimal 3,5 detik', 'Frasa terlarang ditolak otomatis'];

const KIND_LABEL = Object.fromEntries(REPO_KINDS.map(({ id, label }) => [id, label])) as Record<RepoKind, string>;
const FILTERS: { id: RepoKind | 'semua'; label: string; count: number }[] = [
  { id: 'semua', label: 'Semua', count: REPOS.length },
  ...REPO_KINDS.map(({ id, label }) => ({ id, label, count: REPOS.filter((r) => r.kind === id).length })),
];

function CodeLink({ name, title }: { name: string; title: string }) {
  const url = repoUrl(name);
  return url ? <OutLink href={url} label={`Lihat kode sumber ${title} di GitHub`}>Lihat kode sumber</OutLink> : <p className="meta py-2">Kode sumber sedang dalam perapian.</p>;
}

function RepoArchive() {
  const [filter, setFilter] = useState<RepoKind | 'semua'>('semua');
  const [opened, setOpened] = useState(false);
  const shown = filter === 'semua' ? REPOS : REPOS.filter((r) => r.kind === filter);
  return (
    <details className="fold" ref={(el) => { if (el?.open) setOpened(true); }} onToggle={() => setOpened(true)}>
      <summary><span>Arsip proyek GitHub ({REPOS.length})</span><ChevronDown size={20} aria-hidden="true" /></summary>
      <p className="meta mt-4 max-w-[68ch]">Data per {REPO_SNAPSHOT_DATE}. CV mencatat 26 repositori karena disusun lebih awal. Daftar ini mencakup latihan dan turunan karya pihak ketiga.</p>
      <div role="group" aria-label="Saring repositori" className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map(({ id, label, count }) => (
          <button key={id} type="button" className="chip" aria-pressed={filter === id} onClick={() => setFilter(id)}>{label} ({count})</button>
        ))}
      </div>
      <p role="status" className="sr-only">{shown.length} repositori ditampilkan</p>
      {/* Tinggi tetap agar mengganti saringan tidak menggeser halaman. */}
      <div className="mt-4 h-[26rem] overflow-y-auto pr-2" tabIndex={0} role="group" aria-label="Daftar repositori">
        <ul className="divide-y divide-hair">
          {opened && shown.map(({ name, kind, language, pushed, description }) => {
            const url = repoUrl(name);
            return (
              <li key={name} className="grid gap-x-6 py-2 md:grid-cols-[minmax(0,15rem)_1fr_auto] md:items-center">
                {url ? <OutLink href={url}>{name}</OutLink> : <span className="py-2.5 font-bold">{name}</span>}
                <span className="meta">{description}</span>
                <span className="text-sm text-fog md:text-right">{[KIND_LABEL[kind], language, pushed].filter(Boolean).join(', ')}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}

export function GithubShowcaseSection() {
  const story = useRef<HTMLDivElement>(null);
  const studio = useRef<HTMLElement>(null);
  return (
    <Section id="github-showcase" tone="sky" split facts={[['Manfaat', 'Mengurangi pengetikan ulang'], ['Peran', 'Pengembang, proyek pribadi'], ['Kendali', 'Pengguna memeriksa sebelum mengirim']]} title={<>Otomasi pengisian formulir <mark>dari dokumen digital</mark></>} lead="Ekstensi Chrome yang dikembangkan untuk memudahkan pengisian profil MagangHub berdasarkan isi sertifikat atau CV.">
      <div ref={story} className="story grid items-center gap-x-[min(3.5rem,4vw)] gap-y-12 lg:grid-cols-12" data-reveal="story">
        <figure className="lg:col-span-7">
          <div className="relative pb-12 sm:pr-12">
            <div className="browser">
              <div className="browser-bar">Formulir uji MagangHub</div>
              <div className="relative overflow-hidden">
              <EvidenceButton evidence={EVIDENCE.ekstensiForm} sizes="(min-width: 64rem) 42rem, 92vw" className="zoom-top aspect-[10/9]" />
              <span className="scan" aria-hidden="true" />
              {FIELDS.map((f, i) => <span key={i} className={`fld ${f.ok ? 'ok' : 'cek'}`} style={{ ...idx(i), top: f.top, left: f.left, width: f.width, height: f.height }} aria-hidden="true" />)}
              </div>
            </div>
            <div className="side absolute right-0 bottom-0 w-[42%] max-w-[17rem] rotate-2 overflow-hidden rounded-2xl shadow-[0_34px_60px_-28px_rgb(11_30_61/0.7)]">
              <EvidenceButton evidence={EVIDENCE.ekstensiPanel} sizes="17rem" className="zoom-top" />
            </div>
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-x-6">Antarmuka ekstensi dan halaman uji. Sorotan bergerak merupakan ilustrasi alur. <Replay target={story} /></figcaption>
        </figure>
        <div className="lg:col-span-5">
          <ol className="steps">
            {FLOW.map(([title, text], i) => <li key={title} style={idx(i)}><p className="text-[1.1875rem] leading-snug font-bold">{title}</p><p className="mt-0.5 text-[#3b4a63]">{text}</p></li>)}
          </ol>
          <Tech>
            <p>Proyek pribadi: ekstensi Chrome Manifest V3 dengan Side Panel. PDF.js membaca teks, dan model multimodal dipanggil lewat gateway AI untuk dokumen hasil pindaian. Pemindai membaca judul induk kolom, lalu DataTransfer melampirkan berkas. Waktu pengisian belum pernah diukur.</p>
          </Tech>
          <CodeLink name="Autofill_maganghub" title="alat pengisi formulir" />
        </div>
      </div>

      <article id="karya-affiliate" ref={studio} className="tile studio" data-reveal="studio">
        <div>
          <h3>Affiliate Script Studio</h3>
          <p className="studio-claim">Dari tautan produk menjadi <mark>naskah video siap rekam</mark></p>
          <p className="mt-4 text-[1.0625rem] text-[#3b4a63]">Aplikasi penyusun naskah video affiliate untuk TikTok Shop dan Shopee Video. Setiap naskah diperiksa secara otomatis sebelum digunakan.</p>
          <ul className="mt-6 grid gap-3">
            {GATES.map((t, i) => <li key={t} className="tick flex items-center gap-3 font-bold" style={idx(i)}><span className="grid size-7 shrink-0 place-items-center rounded-full bg-sun" aria-hidden="true"><Check size={17} strokeWidth={3} /></span>{t}</li>)}
          </ul>
          <Tech><p>Proyek pribadi: React, TypeScript, Express, Firebase, dan Zod, dengan model bahasa melalui gateway serta riset web. Kerangka awal dari Google AI Studio. Aplikasi internal untuk satu pengguna yang dijalankan secara lokal. Sebanyak 70 pengujian Vitest lulus pada 24 November 2026.</p></Tech>
          <CodeLink name="Scripting-affiliate" title="Affiliate Script Studio" />
        </div>
        <figure>
          <ol className="pipe">{PIPE.map((t, i) => <li key={t} style={idx(i)}>{t}</li>)}</ol>
          <div className="prompter" role="img" aria-label="Ilustrasi teleprompter dengan empat adegan: Hook, Masalah, Bukti, dan Ajakan">
            <div aria-hidden="true">
              {SCENES.map(([role, text], i) => <p key={role} style={idx(i)}><b>{role}</b>{text}</p>)}
              <div className="reel-bar">{SCENES.map(([role], i) => <i key={role} style={idx(i)} />)}<span className="playhead" /></div>
            </div>
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-x-6">Ilustrasi alur kerja, bukan tangkapan layar aplikasi. <Replay target={studio} /></figcaption>
        </figure>
      </article>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <article id="karya-adhebank" className="tile grid items-center gap-8 bg-blue text-white sm:grid-cols-[auto_1fr] lg:col-span-7" data-reveal="ledger">
          <div className="phone text-ink" role="img" aria-label="Ilustrasi susunan Adhebank: dompet, kategori, pemasukan, pengeluaran">
            <div aria-hidden="true">
              <p className="pt-1 pb-2 text-lg font-extrabold">Adhebank</p>
              <div className="flows"><i /><i /><i /><i /><i /><i /></div>
              {['Dompet', 'Kategori', 'Pemasukan', 'Pengeluaran', 'Transfer'].map((t, i) => <div key={t} className="row" style={idx(i)}><b>{t}</b></div>)}
              <p className="pt-3 text-[0.8125rem] leading-snug text-fog">Ilustrasi struktur aplikasi</p>
            </div>
          </div>
          <div>
            <h3>Aplikasi pencatatan keuangan Android</h3>
            <p className="mt-3 text-[1.0625rem] text-white">Adhebank mencatat pemasukan dan pengeluaran. <b>Saldo diperbarui setiap kali transaksi berubah</b>, dan seluruh data disimpan secara lokal pada perangkat.</p>
            <div className="[&_.tech>summary]:text-white"><Tech><p className="text-white">Kotlin dan Jetpack Compose, pola MVVM. Layar membaca StateFlow dari ViewModel, data disimpan dengan Room dan Coroutines.</p></Tech></div>
            <CodeLink name="Adhebank" title="Adhebank" />
          </div>
        </article>
        <article className="tile flex flex-col bg-ink text-white lg:col-span-5" data-reveal="route">
          <svg viewBox="0 0 400 110" className="route mb-6 w-full" aria-hidden="true">
            <path className="track" d="M50 40 H350" /><path className="draw" pathLength="1" d="M50 40 H350" />
            {['Laporan', 'Verifikasi', 'Keputusan'].map((t, i) => <g key={t} className="stop" style={idx(i)} transform={`translate(${50 + i * 150} 40)`}><circle r="20" /><path d="M-8 0 L-2 6 L9 -7" /><text y="52" textAnchor="middle">{t}</text></g>)}
          </svg>
          <h3>Portal pelaporan insiden siber</h3>
          <p className="mt-3 text-[1.0625rem] text-[#d5e0f0]">Pelapor mengisi formulir, <b className="text-white">sistem memverifikasi pengirim</b>, kemudian petugas memeriksa laporan dan menetapkan keputusan.</p>
          <div className="[&_.tech>summary]:text-white"><Tech><p className="text-[#d5e0f0]">PHP dan MySQL dengan prepared statement, verifikasi reCAPTCHA di server, halaman admin untuk persetujuan, dan pembuatan sertifikat pelapor. Halaman depan masih memerlukan perbaikan sebelum dapat didemonstrasikan.</p></Tech></div>
          <div className="mt-auto pt-2"><CodeLink name="csirt-incident-portal" title="portal laporan insiden" /></div>
        </article>
      </div>

      <div className="mt-12 grid gap-3">
        <details className="fold">
          <summary><span>Karya lainnya</span><ChevronDown size={20} aria-hidden="true" /></summary>
          <ul className="divide-y divide-[#c5d3e8]">
            {OTHER_PROJECTS.map(({ name, title, kind, stack, detail }) => (
              <li key={name} className="grid gap-x-10 gap-y-1 py-6 md:grid-cols-[1.1fr_1.9fr_auto]">
                <div><p className="text-[1.125rem] leading-snug font-bold">{title}</p><p className="meta">{kind}</p></div>
                <p className="text-[#3b4a63]">{detail} <span className="meta block">{stack}</span></p>
                <CodeLink name={name} title={title} />
              </li>
            ))}
          </ul>
        </details>
        <RepoArchive />
      </div>
      <p className="mt-6"><OutLink href={CONTACT.github.url}>Buka profil GitHub</OutLink></p>
    </Section>
  );
}
