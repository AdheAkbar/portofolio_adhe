import { useState, type CSSProperties } from 'react';
import { EVIDENCE, RESEARCH } from '../data/portfolioData';
import { EvidenceButton, OutLink, Section, Tech } from '../lib/ui';
import { SentimentSandbox } from './SentimentSandbox';

const PIPELINE = [
  ['Pengumpulan data', 'Ulasan DANA, OVO, DOKU, dan LinkAja dari Google Play.'],
  ['Praproses', 'Pembersihan teks agar dapat diolah oleh sistem.'],
  ['Pemodelan', 'Pelatihan dua algoritma untuk mengenali sentimen.'],
  ['Evaluasi', 'Perbandingan akurasi kedua algoritma.'],
];

const STATS = [
  ['p = 0,0045', 'Uji McNemar', 'Beda kedua model signifikan secara statistik'],
  ['129 kali', 'Prediksi lebih cepat', 'Naive Bayes terhadap KNN, dalam eksperimen ini saja'],
  ['0,9237', 'AUC-ROC', 'Naive Bayes'],
  ['57,54%', 'Ulasan negatif', 'TF-IDF 5.000 fitur, stratified sampling'],
];

// Titik ilustratif dengan posisi tetap: ulasan acak di kiri, makin rapat ke garis di kanan.
// Digabung menjadi delapan path (4 ukuran, 2 warna) agar DOM tetap kecil.
const DOTS = Array.from({ length: 8 }, () => '');
for (let i = 0; i < 420; i++) {
  const rand = (n: number) => { const v = Math.sin(n) * 43758.5453; return v - Math.floor(v); };
  const x = rand(i * 7.13 + 1) * 100;
  const spread = 140 * Math.max(0, 1 - x / 92) ** 1.15;
  DOTS[(i % 4) + (i % 5 ? 0 : 4)] += `M${Math.round(x * 14.4)} ${Math.round(150 + (rand(i * 3.71 + 5) * 2 - 1) * spread)}h0`;
}

const id = (n: number) => n.toLocaleString('id-ID');

export function SintaResearchSection() {
  const [sim, setSim] = useState(false);
  return (
    <Section id="sinta-3-research" className="night" facts={[['Publikasi', 'Jurnal BITS, Maret 2026'], ['Peran', 'Penulis pertama'], ['Cakupan', 'Empat dompet digital']]} title={<>Penelitian klasifikasi sentimen <mark>pengguna dompet digital</mark></>} lead="Ditulis bersama Fenty Ariany untuk membandingkan dua algoritma dalam mengenali sentimen ulasan.">
      <div data-reveal="line">
        <div className="stream">
          <svg viewBox="0 0 1440 300" preserveAspectRatio="xMinYMid slice" aria-hidden="true">
            {DOTS.map((d, i) => <path key={i} d={d} fill="none" strokeLinecap="round" stroke={i < 4 ? '#8b74f0' : '#c4b5fd'} strokeWidth={3.2 + (i % 4) * 1.4} />)}
            <path className="draw" pathLength="1" d="M560 150 H1440" stroke="#c4b5fd" strokeWidth="3" />
          </svg>
          <strong>18.869<small>ulasan pengguna dianalisis</small></strong>
        </div>
        <ol className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {PIPELINE.map(([title, text]) => <li key={title}><p className="text-[1.1875rem] font-bold">{title}</p><p className="mt-1 text-fog">{text}</p></li>)}
        </ol>
      </div>

      <div className="mt-20 grid items-center gap-x-[min(4rem,4vw)] gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="max-w-[24ch] text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] leading-[1.14] font-bold tracking-tight" data-reveal="mark">
            Akurasi terbaik mencapai <mark>88,5%</mark>, setara sekitar 88 dari 100 ulasan.
          </p>
          <figure className="mt-10" data-reveal="grow">
            <figcaption className="mb-5 !text-[#c6d3e6]">Akurasi klasifikasi, skala 0 sampai 100 persen</figcaption>
            {RESEARCH.models.map(({ name, accuracy }, i) => (
              <div key={name} className="mb-5" title={`${name}: ${id(accuracy)}%`}>
                <p className="mb-1.5 flex flex-wrap items-baseline justify-between"><span className="font-semibold">{name}</span><span className="text-[1.75rem] leading-none font-extrabold tracking-tight tabular-nums">{id(accuracy)}%</span></p>
                <div className="bar-track"><div className="bar" style={{ '--v': accuracy, '--i': i } as CSSProperties} /></div>
              </div>
            ))}
          </figure>
          <p className="max-w-[60ch] text-[1.125rem] text-fog">Akurasi kedua algoritma berdekatan. Dalam eksperimen ini, Naive Bayes memerlukan waktu prediksi yang jauh lebih singkat.</p>
          <Tech label="Rincian hasil pengujian">
            <dl className="grid gap-x-10 gap-y-5 pt-2 sm:grid-cols-2">
              {STATS.map(([value, name, context]) => <div key={name}><dt className="text-fog">{name}</dt><dd><span className="text-[1.5rem] font-extrabold tabular-nums">{value}</span> <span className="meta block">{context}</span></dd></div>)}
            </dl>
          </Tech>
        </div>
        <aside className="lg:col-span-4" data-reveal>
          <EvidenceButton evidence={EVIDENCE.jurnal} sizes="(min-width: 64rem) 24rem, 92vw" className="aspect-[4/5] -rotate-2 [&_img]:object-top" />
          <p className="mt-7 leading-snug font-bold">{RESEARCH.title}</p>
          <p className="meta mt-2">{RESEARCH.journal}.</p>
          <p className="mt-3"><OutLink href={RESEARCH.articleUrl}>Baca artikel</OutLink></p>
        </aside>
      </div>

      <details className="tech mt-12" ref={(el) => { if (el?.open) setSim(true); }} onToggle={() => setSim(true)}>
        <summary>Simulasi berbasis kata kunci</summary>
        {sim && <SentimentSandbox />}
      </details>
      <p className="meta mt-4">Titik pada gambar merupakan ilustrasi, bukan sebaran data penelitian.</p>
    </Section>
  );
}
