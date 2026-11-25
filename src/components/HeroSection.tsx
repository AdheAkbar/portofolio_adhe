import { ArrowDown, Download } from 'lucide-react';
import type { Photo } from '../data/portfolioData';
import { asset } from '../lib/asset';
import { Img } from './Img';

const PORTRAIT: Photo = {
  name: 'potret-lepas', widths: [420, 560, 720, 960], width: 1024, height: 1536,
  alt: 'Potret formal M. Adhe Akbar mengenakan jas hitam, kemeja putih, dan dasi',
};

const PROOFS = [
  { href: '#sinta-3-research', key: '18.869', title: 'ulasan diteliti', text: 'Terbit di jurnal BITS, 2026' },
  { href: '#github-showcase', key: 'Otomasi', title: 'Autofill MagangHub', text: 'Ekstensi pengisi formulir' },
  { href: '#karya-affiliate', key: 'Naskah AI', title: 'Affiliate Script Studio', text: 'Naskah dari tautan produk' },
  { href: '#karya-adhebank', key: 'Android', title: 'Adhebank', text: 'Aplikasi catatan keuangan' },
  { href: '#pkm', key: '60+ siswa', title: 'Game Jelajah Quiz', text: 'Edukasi sekolah dasar' },
  { href: '#kreatif-juara', key: 'Juara 1', title: 'Animasi 2D/3D', text: 'Karya tim, Expo 2025' },
  { href: '#kreatif-juara', key: 'Juara 3', title: 'Teknokrat Portal AR', text: 'Karya tim, Expo 2025' },
  { href: '#branding', key: 'Finalis', title: 'Muli Mekhanai', text: 'Duta wisata Pesawaran' },
  { href: '#branding', key: 'Finalis', title: 'Brand Ambassador', text: 'Jaya Bakery 2023, 15 besar' },
  { href: '#pendidikan', key: '3,59', title: 'IPK, Cum Laude', text: 'S1 Informatika' },
];

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-judul" className="hero">
      <div className="hero-stage">
        <div className="hero-plane" aria-hidden="true" />
        <svg className="hero-orbit" viewBox="0 0 600 600" aria-hidden="true">
          <path pathLength="1" d="M40 560 C-20 260 150 40 350 60 S620 300 540 560" />
        </svg>
        <div className="wrap hero-grid">
          <div className="hero-text">
            <h1 id="hero-judul">
              <span className="hero-line"><span>M. Adhe</span></span>
              <span className="hero-line"><span>Akbar, S.Kom.</span></span>
            </h1>
            <p className="hero-claim">Menghubungkan <mark>data, sistem, dan komunikasi</mark> agar pekerjaan berjalan lebih terstruktur.</p>
            <p className="hero-lead">
              Sarjana Informatika Universitas Teknokrat Indonesia dengan pengalaman <b>pengembangan aplikasi, pengolahan data, administrasi, dukungan IT, dan publikasi</b>.
            </p>
            <div className="hero-cta">
              <a className="btn bg-sun text-ink hover:bg-white" href="#github-showcase">Lihat karya pilihan <ArrowDown size={18} aria-hidden="true" /></a>
              <a className="btn btn-ghost" href={asset('assets/CV_M_Adhe_Akbar_ATS.pdf')} download="CV_M_Adhe_Akbar_ATS.pdf"><Download size={18} aria-hidden="true" /> Unduh CV</a>
            </div>
          </div>
          <figure className="portrait">
            <Img photo={PORTRAIT} sizes="(min-width: 60rem) 34rem, min(31rem, calc(100vw - 2.5rem))" eager />
          </figure>
        </div>
      </div>
      <div className="wrap proofs">
        {PROOFS.map(({ href, key, title, text }) => (
          <a key={title} href={href} className="proof">
            <span className="proof-key">{key}</span>
            <span><strong>{title}</strong><span className="meta block">{text}</span></span>
          </a>
        ))}
      </div>
    </section>
  );
}
