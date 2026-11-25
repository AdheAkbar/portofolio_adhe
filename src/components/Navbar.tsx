import { useEffect, useRef, useState } from 'react';
import { FileText, Menu } from 'lucide-react';
import { SECTIONS } from '../data/portfolioData';
import { useUi } from '../lib/ui';

const MAIN = SECTIONS.filter((s) => s.main);

function useActiveSection() {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = 'hero';
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'kontak';
      setActive(current);
    };
    let frame = 0;
    const queue = () => { frame ||= requestAnimationFrame(() => { frame = 0; update(); }); };
    queue();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, []);
  return active;
}

export function Navbar() {
  const { openCv } = useUi();
  const active = useActiveSection();
  const tocRef = useRef<HTMLElement>(null);
  // Section pendamping menyalakan menu utama terdekat di atasnya.
  const activeIndex = SECTIONS.findIndex((s) => s.id === active);
  const activeMain = [...SECTIONS.slice(0, activeIndex + 1)].reverse().find((s) => s.main)?.id;

  return (
    <header className="nav">
      <div className="wrap flex min-h-(--nav-h) flex-wrap items-center justify-between gap-3">
        <a href="#hero" className="inline-flex min-h-11 items-center text-[1.0625rem] font-extrabold tracking-tight whitespace-nowrap">M. Adhe Akbar</a>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex flex-wrap">
            {MAIN.map(({ id, nav }) => (
              <li key={id}><a href={`#${id}`} className="nav-link" aria-current={activeMain === id ? 'location' : undefined}>{nav}</a></li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" className="btn min-h-11 bg-sun px-4 py-2 text-ink hover:bg-ink hover:text-white" onClick={openCv}><FileText size={18} aria-hidden="true" /> CV</button>
          <button type="button" popoverTarget="daftar-isi" className="btn btn-line min-h-11 px-3 py-2"><Menu size={20} aria-hidden="true" /> <span className="max-[24rem]:sr-only">Isi</span><span className="sr-only"> halaman</span></button>
        </div>
      </div>

      <nav ref={tocRef} id="daftar-isi" popover="auto" className="toc" aria-label="Daftar isi halaman">
        <ul>
          {SECTIONS.map(({ id, nav }) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => tocRef.current?.hidePopover()}>
                {nav}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
