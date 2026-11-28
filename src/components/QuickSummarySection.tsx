import { ArrowRight } from 'lucide-react';
import { EVIDENCE, type Evidence } from '../data/portfolioData';
import { EvidenceButton, Section, idx } from '../lib/ui';

const RESULTS: { title: string; text: string; items: [href: string, result: string, detail: string][]; photo: Evidence; crop: string }[] = [
  {
    title: 'Konten, publikasi, dan komunikasi publik',
    text: 'Penulisan naskah, penyuntingan konten, peran di depan kamera, dan pelayanan pelanggan.',
    items: [
      ['#konten-video', 'Remotion Edit', 'Intro tiga gaya dan konten pendek dengan takarir serta motion graphic'],
      ['#bappeda-publikasi', 'Sekitar 30 konten publikasi', 'Ide, naskah, dan suntingan konten BAPPEDA Provinsi Lampung'],
      ['#bappeda-talent', 'On-camera talent', 'Reel PPID BAPPEDA Provinsi Lampung'],
      ['#lita-global', 'Rating pelanggan 5,0', 'Pada tiga layanan di Lita Global'],
    ],
    photo: EVIDENCE.bappedaReel, crop: '[&_img]:object-[50%_62%]',
  },
  {
    title: 'Pengembangan aplikasi dan pengolahan data',
    text: 'Aplikasi web, Android, dan alat otomasi, serta pengolahan data menjadi informasi yang terstruktur.',
    items: [
      ['#sinta-3-research', '18.869 ulasan diteliti', 'Komparasi Naive Bayes dan KNN, terbit di jurnal BITS 2026'],
      ['#github-showcase', 'Autofill MagangHub', 'Ekstensi Chrome untuk otomasi pengisian formulir'],
      ['#karya-affiliate', 'Affiliate Script Studio', 'Aplikasi penyusun naskah video dengan pemeriksaan otomatis'],
      ['#pkm', 'Jelajah Quiz', 'Game edukasi untuk 60+ siswa sekolah dasar'],
    ],
    photo: EVIDENCE.quizIpa, crop: '',
  },
  {
    title: 'Administrasi, jaringan, dan dukungan IT',
    text: 'Notulensi, pembakuan SOP, validasi data, dan penanganan gangguan jaringan.',
    items: [
      ['#bappeda', 'SOP dan notulensi rapat', 'Review SOP dan notulensi lintas bidang di BAPPEDA Provinsi Lampung'],
      ['#field-operations', 'Jaringan fiber optik', 'Pemantauan jaringan dan penyambungan serat optik di PT SMS'],
      ['#field-operations', 'Validasi data penerima bantuan', 'Survei dan pendataan lapangan bersama Teman Baik Lampung'],
    ],
    photo: EVIDENCE.bappedaRapat, crop: '',
  },
];

export function QuickSummarySection() {
  return (
    <Section id="ringkasan" thread="kanan" title="Hasil dan karya utama" lead="Karya dan capaian dari tiga bidang yang saya tekuni, dimulai dari konten dan publikasi.">
      <div id="peta-posisi">
        {RESULTS.map(({ title, text, items, photo, crop }) => (
          <div key={title} className="result" data-reveal>
            <div className="result-head">
              <h3>{title}</h3>
              <p>{text}</p>
              <EvidenceButton evidence={photo} sizes="(min-width: 60rem) 26rem, 92vw" className={`aspect-[16/10] ${crop}`} />
            </div>
            <ul>
              {items.map(([href, result, detail], i) => (
                <li key={result} style={idx(i)}>
                  <a href={href}><span><b>{result}</b><span>{detail}</span></span><ArrowRight size={22} aria-hidden="true" /></a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
