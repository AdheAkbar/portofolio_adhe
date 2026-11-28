import { useState } from 'react';
import { EVIDENCE, type Evidence } from '../data/portfolioData';
import { EvidenceButton, EvidenceLink, idx, Section } from '../lib/ui';
import { Img } from './Img';

const GALLERY: { e: Evidence; note: string }[] = [
  { e: EVIDENCE.bappedaCanva, note: 'Penyusunan materi publikasi menggunakan Canva.' },
  { e: EVIDENCE.bappedaReel, note: 'Reel yang telah dipublikasikan pada akun PPID BAPPEDA.' },
  { e: EVIDENCE.bappedaRapat, note: 'Dokumentasi kegiatan di lingkungan BAPPEDA.' },
  { e: EVIDENCE.bappedaTim, note: 'Dokumentasi bersama peserta magang.' },
];

export function BappedaExperienceSection() {
  const [active, setActive] = useState(0);
  const { e, note } = GALLERY[active];

  return (
    <Section id="bappeda" split facts={[['Hasil', 'Sekitar 30 konten publikasi'], ['Alat', 'CapCut dan Canva'], ['Periode', 'Juli–September 2025']]} title={<>Humas dan konten digital <mark>di BAPPEDA Provinsi Lampung</mark></>} lead="Magang Administrasi TI, Humas, dan Konten Digital pada Badan Perencanaan Pembangunan Daerah: dari ide konten, naskah, dan penyuntingan hingga dokumentasi kegiatan.">
      <div className="grid items-start gap-x-[min(5rem,5vw)] gap-y-16 lg:grid-cols-12">
        <div className="sheet-host lg:col-span-5 lg:pt-6" data-reveal="sheet">
          <div className="sheet">
            <h3>Administrasi dan dukungan rapat</h3>
            <p className="mt-2 text-fog">Mengelola surat masuk, menyiapkan perangkat rapat, dan menjaga kejelasan prosedur kerja.</p>
            <ol className="steps mt-7">
              <li style={idx(0)}><p className="font-bold">Notulensi rapat</p><p className="text-fog">Mencatat hasil rapat lintas bidang secara terstruktur.</p></li>
              <li style={idx(1)}><p className="font-bold">Peninjauan SOP</p><p className="text-fog">Meninjau dokumen prosedur kerja internal beberapa bidang.</p></li>
              <li style={idx(2)}><p className="font-bold">Pembakuan dokumen</p><p className="text-fog">Menyeragamkan prosedur agar mudah diterapkan.</p></li>
            </ol>
          </div>
        </div>

        <div id="bappeda-publikasi" className="lg:col-span-7" data-reveal>
          <h3>Publikasi dan dokumentasi</h3>
          <p className="mt-2 max-w-[56ch] text-[1.125rem] text-[#3b4a63]">Menyusun ide konten dan naskah, lalu menyunting <b className="text-ink">sekitar 30 konten publikasi</b> dengan CapCut dan Canva, meliputi berita kegiatan, dokumentasi acara, dan satu reel Instagram.</p>
          <figure className="mt-6">
            <div className="swap" key={e.id}>
              <EvidenceButton evidence={e} sizes="(min-width: 64rem) 44rem, 92vw" className={`aspect-[3/2] ${e.photo.width < 600 ? 'contain' : ''}`} />
            </div>
            <figcaption aria-live="polite">{note}</figcaption>
          </figure>
          <div role="group" aria-label="Pilih dokumentasi" className="mt-4 grid grid-cols-4 gap-3">
            {GALLERY.map((g, i) => (
              <button key={g.e.id} type="button" aria-pressed={i === active} aria-label={`Tampilkan: ${g.e.title}`} onClick={() => setActive(i)} className="h-[clamp(44px,8vw,6.5rem)] overflow-hidden rounded-xl border-[3px] border-transparent aria-pressed:border-blue">
                <Img photo={{ ...g.e.photo, alt: '' }} sizes="10rem" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <article id="bappeda-talent" className="talent" data-reveal="talent">
        <figure>
          <div className="relative">
            <EvidenceButton evidence={EVIDENCE.bappedaReel} sizes="(min-width: 64rem) 27rem, 92vw" className="zoom-top aspect-[610/760]" />
            <span className="talent-ring" aria-hidden="true"><b>M. Adhe Akbar</b></span>
          </div>
        </figure>
        <div>
          <h3>On-camera talent <mark>reel PPID BAPPEDA</mark></h3>
          <p className="talent-role">Memerankan sudut pandang mahasiswa yang tidak mengikuti aksi demonstrasi pada saat demonstrasi berlangsung.</p>
          <p className="mt-5 max-w-[52ch] text-[1.0625rem] text-[#d5e0f0]">Reel ini memperkenalkan <b className="text-white">Lampung-In</b> sebagai saluran penyampaian aspirasi kepada DPRD melalui ponsel.</p>
          <dl className="mt-7 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            <div><dt className="text-[#d5e0f0]">Peran</dt><dd className="text-[1.1875rem] font-bold">On-camera talent</dd></div>
            <div><dt className="text-[#d5e0f0]">Publikasi</dt><dd className="text-[1.1875rem] font-bold">Reel akun ppid_bappedalpg</dd></div>
          </dl>
          <p className="mt-4"><EvidenceLink evidence={EVIDENCE.bappedaReel}>Lihat tangkapan layar</EvidenceLink></p>
        </div>
      </article>
    </Section>
  );
}
