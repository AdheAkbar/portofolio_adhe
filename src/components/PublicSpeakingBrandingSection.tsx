import { EVIDENCE } from '../data/portfolioData';
import { EvidenceButton } from '../lib/ui';
import { Img } from './Img';

export function PublicSpeakingBrandingSection() {
  return (
    <section id="branding" aria-labelledby="branding-judul">
      <div className="wide">
        <Img photo={EVIDENCE.runway.photo} sizes="100vw" className="object-[50%_35%]" />
        <div className="wrap" data-reveal="mark">
          <h2 id="branding-judul" className="max-w-[14ch]">Komunikasi publik <mark>dan representasi</mark></h2>
          <p className="mt-5 max-w-[38ch] text-[clamp(1.0625rem,1rem+0.35vw,1.25rem)]">Pengalaman sebagai model, finalis duta wisata, dan finalis brand ambassador memperkuat kemampuan komunikasi di hadapan publik.</p>
        </div>
      </div>
      <div className="sec">
        <div className="wrap film" data-reveal>
          <div className="grid gap-x-8 gap-y-10 py-6 md:grid-cols-12">
            <figure className="md:col-span-4">
              <EvidenceButton evidence={EVIDENCE.fashion} sizes="(min-width: 48rem) 26rem, 92vw" className="aspect-[3/4] [&_img]:object-[50%_15%]" />
              <figcaption><b className="block text-[1.125rem] text-ink">Model busana lokal</b> Peragaan busana dan pemotretan untuk tiga merek lokal, Agustus 2023.</figcaption>
            </figure>
            <figure className="md:col-span-4 md:pt-14">
              <EvidenceButton evidence={EVIDENCE.mekhanai} sizes="(min-width: 48rem) 26rem, 92vw" className="aspect-[3/4] [&_img]:object-[50%_75%]" />
              <figcaption><b className="block text-[1.125rem] text-ink">Finalis Muli Mekhanai Pesawaran</b> Pemilihan duta wisata 2023, terlibat dalam video promosi daerah.</figcaption>
            </figure>
            <figure className="md:col-span-4">
              <EvidenceButton evidence={EVIDENCE.jaya} sizes="(min-width: 48rem) 26rem, 92vw" className="aspect-[3/4] [&_img]:object-[42%_50%]" />
              <figcaption><b className="block text-[1.125rem] text-ink">Finalis 15 besar Jaya Bakery</b> Seleksi brand ambassador 2023 melalui wawancara, pemotretan, roadshow, dan uji public speaking. Konten promosi yang saya bintangi meraih <b className="text-ink">total 4.000+ tayangan</b>.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
