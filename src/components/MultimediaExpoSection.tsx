import { EVIDENCE } from '../data/portfolioData';
import { EvidenceButton, EvidenceLink, GoLink, Section } from '../lib/ui';

const Rank = ({ n }: { n: number }) => (
  <p className="text-[clamp(1.75rem,1.3rem+1.6vw,2.6rem)] leading-none font-extrabold tracking-tight"><mark>Juara {n}</mark></p>
);

export function MultimediaExpoSection() {
  return (
    <Section id="kreatif-juara" tone="canvas" title="Penghargaan Academic Expo 2025" lead="Diselenggarakan oleh Universitas Teknokrat Indonesia.">
      <div className="grid gap-x-[min(3.5rem,4vw)] gap-y-14 lg:grid-cols-12">
        <article className="lg:col-span-7" data-reveal="mark">
          <EvidenceButton evidence={EVIDENCE.expoAnimasi} sizes="(min-width: 64rem) 46rem, 92vw" className="aspect-[5/4] [&_img]:object-[50%_88%]" />
          <div className="mt-6"><Rank n={1} /></div>
          <h3 className="mt-4">Animasi 2D/3D</h3>
          <p className="text-fog">Karya tim Kelompok Pemula.</p>
          <EvidenceLink evidence={EVIDENCE.piagamAnimasi}>Lihat piagam</EvidenceLink>
        </article>
        <div className="grid content-start gap-12 lg:col-span-5">
          <article data-reveal="mark">
            <Rank n={2} />
            <h3 className="mt-4">Machine Learning dengan Python</h3>
            <p className="text-fog">Penghargaan tercantum dalam CV.</p>
            <GoLink href="#sinta-3-research">Lihat penelitian terkait</GoLink>
          </article>
          <article data-reveal="mark">
            <EvidenceButton evidence={EVIDENCE.expoAr} sizes="(min-width: 64rem) 32rem, 92vw" className="aspect-[4/3] [&_img]:object-[50%_92%]" />
            <div className="mt-6"><Rank n={3} /></div>
            <h3 className="mt-4">Aplikasi AR/VR</h3>
            <p className="text-fog">Teknokrat Portal AR, karya tim Recyle.</p>
            <EvidenceLink evidence={EVIDENCE.piagamAr}>Lihat piagam</EvidenceLink>
          </article>
        </div>
      </div>
    </Section>
  );
}
