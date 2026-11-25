import { EVIDENCE } from '../data/portfolioData';
import { EvidenceButton, Section } from '../lib/ui';

const RATINGS = [
  ['Mobile Legends', 'Layanan permainan', '4.694'],
  ['Teman Curhat', 'Layanan percakapan', '142'],
  ['Sleep Call', 'Layanan panggilan', '56'],
];

export function LitaGlobalSection() {
  return (
    <Section id="lita-global" tone="sky" thread="kiri" title={<>Pelayanan pelanggan digital <mark>dengan rating 5,0</mark></>}>
      <div className="grid items-center gap-x-[min(4rem,4vw)] gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="flex flex-wrap items-end gap-x-5 gap-y-1"><span className="big">4.892</span><span className="max-w-[24ch] pb-2 text-[1.125rem] leading-snug text-[#3b4a63]">ulasan pelanggan dari tiga kategori layanan</span></p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {RATINGS.map(([name, detail, count]) => (
              <div key={name} className="bubble" data-reveal>
                <p className="text-[1.75rem] leading-none font-extrabold tracking-tight tabular-nums">{count}</p>
                <p className="mt-3 font-bold">{name}</p>
                <p className="meta">{detail}</p>
              </div>
            ))}
          </div>
          <div className="bubble mine mt-4 ml-auto max-w-[38rem]" data-reveal>
            <p className="text-[1.125rem]">Pengalaman ini membentuk <b>kemampuan komunikasi, ketepatan respons, dan penanganan keluhan</b> secara profesional.</p>
          </div>
          <p className="mt-6 max-w-[62ch] text-[#3b4a63]">Lita merupakan platform layanan hiburan dan percakapan daring. Berdasarkan CV, lebih dari 4.500 pesanan diselesaikan pada September 2024–Agustus 2026. Jumlah ulasan dan pesanan merupakan data yang berbeda.</p>
        </div>
        <figure className="lg:col-span-4" data-reveal>
          <div className="mx-auto max-w-[19rem] rotate-2">
            <EvidenceButton evidence={EVIDENCE.litaUlasan} sizes="20rem" className="aspect-[3/4] [&_img]:object-[50%_14%]" />
          </div>
          <figcaption className="mx-auto mt-5 max-w-[19rem]">Tangkapan layar akun, November 2026.</figcaption>
        </figure>
      </div>
    </Section>
  );
}
