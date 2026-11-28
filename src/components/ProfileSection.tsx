import type { Photo } from '../data/portfolioData';
import { idx, Section } from '../lib/ui';
import { Img } from './Img';

const PHOTO: Photo = { name: 'potret-jas', widths: [480, 680, 960], width: 960, height: 1200, alt: 'M. Adhe Akbar mengenakan setelan jas biru tua di area taman pada sore hari' };

const FACTS = [
  ['Nama lengkap', 'M. Adhe Akbar, S.Kom.'],
  ['Pendidikan', 'S1 Informatika, lulus Juli 2026'],
  ['Domisili', 'Bandar Lampung, Lampung'],
  ['Bahasa', 'Indonesia dan Inggris (menengah)'],
];

const METHOD = [
  ['Analisis kebutuhan', 'Mengidentifikasi pengguna, alur kerja, dan kendala yang dihadapi.'],
  ['Penataan informasi', 'Menyusun data dan prosedur agar terstruktur.'],
  ['Pengembangan solusi', 'Merancang aplikasi, otomasi, atau dokumen panduan.'],
  ['Pemeriksaan hasil', 'Memvalidasi keluaran terhadap sumber dan kebutuhan awal.'],
  ['Serah terima', 'Menyampaikan hasil beserta penjelasan penggunaannya.'],
];

export function ProfileSection() {
  return (
    <Section id="profil" title={<>Pembuat konten dan komunikator publik <mark>berlatar belakang informatika</mark></>}>
      <div className="grid items-center gap-x-[min(4rem,4vw)] gap-y-10 lg:grid-cols-12">
        <figure className="lg:col-span-5" data-reveal>
          <Img photo={PHOTO} sizes="(min-width: 64rem) 31rem, calc(100vw - 2.5rem)" className="aspect-[4/5] w-full rounded-[28px] object-cover" />
        </figure>
        <div className="lg:col-span-7">
          <p className="max-w-[56ch] text-[clamp(1.125rem,1rem+0.6vw,1.4rem)] leading-normal">
            Saya menempuh pendidikan Teknik Komputer dan Jaringan di SMK, kemudian melanjutkan studi S1 Informatika. Pengalaman saya berpusat pada <b>produksi konten publikasi, peran di depan kamera, dan komunikasi langsung dengan publik</b>, ditopang kemampuan mengolah data, administrasi, dan dukungan IT.
          </p>
          <dl className="mt-9 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {FACTS.map(([k, v]) => <div key={k}><dt className="text-fog">{k}</dt><dd className="text-[1.1875rem] leading-snug font-bold">{v}</dd></div>)}
          </dl>
        </div>
      </div>

      <div className="method" data-reveal="method">
        <h3>Metode kerja</h3>
        <ol>
          {METHOD.map(([title, text], i) => (
            <li key={title} style={idx(i)}><b>{title}</b><span>{text}</span></li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
