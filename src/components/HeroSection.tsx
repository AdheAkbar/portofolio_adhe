import { ArrowDown, Download } from 'lucide-react';
import type { Photo } from '../data/portfolioData';
import { asset } from '../lib/asset';
import { Img } from './Img';

const PORTRAIT: Photo = {
  name: 'potret-lepas', widths: [420, 560, 720, 960], width: 1024, height: 1536,
  alt: 'Potret formal M. Adhe Akbar mengenakan jas hitam, kemeja putih, dan dasi',
};

const PROOFS = [
  { href: '#bappeda-publikasi', key: '30 konten', title: 'Publikasi BAPPEDA', text: 'Ide, naskah, dan suntingan' },
  { href: '#konten-video', key: 'Remotion', title: 'Video motion graphic', text: 'Intro dan konten pendek' },
  { href: '#bappeda-talent', key: '6.000+', title: 'kali ditonton', text: 'Reel Lampung-In, talent dan editor' },
  { href: '#karya-affiliate', key: 'Naskah', title: 'Script Studio', text: 'Penyusun naskah video' },
  { href: '#kreatif-juara', key: 'Juara 1', title: 'Animasi 2D/3D', text: 'Karya tim, Expo 2025' },
  { href: '#branding', key: 'Finalis', title: 'Muli Mekhanai', text: 'Duta wisata Pesawaran' },
  { href: '#branding', key: '4.000+', title: 'tayangan konten', text: 'Finalis Brand Ambassador Jaya Bakery' },
  { href: '#lita-global', key: '4.892', title: 'ulasan pelanggan', text: 'Rating 5,0 di Lita Global' },
  { href: '#sinta-3-research', key: '18.869', title: 'ulasan diteliti', text: 'Terbit di jurnal BITS, 2026' },
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
            <p className="hero-claim">Menyusun, memproduksi, dan menyebarkan <mark>konten informasi publik</mark> yang mudah dipahami.</p>
            <p className="hero-lead">
              Pengalaman magang humas dan konten digital di BAPPEDA Provinsi Lampung: <b>menyusun ide dan naskah, menyunting konten publikasi, serta tampil sebagai talent</b>. Didukung latar belakang S1 Informatika.
            </p>
            <div className="hero-cta">
              <a className="btn bg-sun text-ink hover:bg-white" href="#konten-video">Lihat karya konten <ArrowDown size={18} aria-hidden="true" /></a>
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
