import { EVIDENCE } from '../data/portfolioData';
import { EvidenceButton, Section } from '../lib/ui';

export function EducationSection() {
  return (
    <Section id="pendidikan" thread="kanan" title={<>Riwayat pendidikan <mark>dan data diri</mark></>}>
      <div className="grid items-center gap-x-[min(4rem,4vw)] gap-y-12 lg:grid-cols-12">
        <figure className="lg:col-span-5" data-reveal>
          <EvidenceButton evidence={EVIDENCE.wisuda} sizes="(min-width: 64rem) 32rem, 92vw" className="aspect-[4/5] [&_img]:object-[50%_22%]" />
        </figure>
        <div className="lg:col-span-7">
          <p className="flex flex-wrap items-end gap-x-5"><span className="big">3,59</span><span className="pb-2 text-[1.25rem] leading-snug text-[#3b4a63]">Indeks Prestasi Kumulatif, skala 4,00<b className="block text-ink">Predikat Cum Laude</b></span></p>
          <ol className="mt-10 grid gap-9">
            <li><h3>S1 Informatika</h3><p className="text-[1.125rem]">Universitas Teknokrat Indonesia</p><p className="text-fog">September 2022–Juli 2026</p></li>
            <li><h3>Teknik Komputer dan Jaringan</h3><p className="text-[1.125rem]">SMKN 1 Bandar Lampung</p><p className="text-fog">Juli 2019–Juni 2022</p></li>
          </ol>
          <h3 className="mt-12">Data diri</h3>
          <dl className="mt-4 flex flex-wrap gap-x-14 gap-y-5">
            <div><dt className="text-fog">Tinggi badan</dt><dd className="figure">182 <span>cm</span></dd></div>
            <div><dt className="text-fog">Berat badan</dt><dd className="figure">79 <span>kg</span></dd></div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
