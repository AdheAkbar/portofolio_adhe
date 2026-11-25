import { EVIDENCE, repoUrl } from '../data/portfolioData';
import { EvidenceButton, EvidenceLink, Facts, OutLink } from '../lib/ui';
import { Img } from './Img';

export function PkmCaseStudiesSection() {
  return (
    <section id="pkm" aria-labelledby="pkm-judul">
      <div className="sunny sunny-grid">
        <div className="wrap sunny-text self-center py-16" data-reveal="mark">
          <h2 id="pkm-judul">Media pembelajaran digital <mark>untuk siswa sekolah dasar</mark></h2>
          <p className="mt-6 max-w-[46ch] text-[clamp(1.0625rem,1rem+0.35vw,1.25rem)]">Saya mengembangkan game edukasi Jelajah Quiz dan bersama tim memfasilitasi literasi teknologi bagi <b>60+ siswa kelas 4–6</b> SD Negeri 2 Bumisari.</p>
          <div className="mt-4 flex flex-col items-start"><EvidenceLink evidence={EVIDENCE.pkmTim}>Lihat dokumentasi kegiatan</EvidenceLink><OutLink href={repoUrl('Jelajah-quiz')!} label="Lihat kode sumber Jelajah Quiz di GitHub">Lihat kode sumber</OutLink></div>
        </div>
        <Img photo={EVIDENCE.pkmPraktik.photo} sizes="(min-width: 60rem) 46vw, 100vw" className="sunny-photo" />
      </div>
      <div className="sec" data-tone="canvas">
        <div className="wrap">
          <Facts items={[['Peserta', '60+ siswa kelas 4–6'], ['Peran', 'Pengembang game dan fasilitator'], ['Periode', 'September–Oktober 2025']]} />
          <div className="grid items-center gap-x-[min(4rem,4vw)] gap-y-10 lg:grid-cols-12">
            <figure className="lg:col-span-7" data-reveal="quiz">
              <div className="relative"><EvidenceButton evidence={EVIDENCE.quizIpa} sizes="(min-width: 64rem) 46rem, 92vw" className="aspect-video" /><span className="answer" aria-hidden="true" /></div>
              <figcaption>Tampilan soal IPA, disusun ulang dari berkas sumber game.</figcaption>
            </figure>
            <div className="lg:col-span-5">
              <h3>Jelajah Quiz</h3>
              <p className="mt-4 text-[1.125rem] text-[#3b4a63]">Siswa memilih mata pelajaran Matematika, IPA, atau IPS, menjawab soal, dan memperoleh skor.</p>
            </div>
          </div>

          <div id="pkm-vaganza" className="mt-16 grid gap-x-[min(3.5rem,4vw)] gap-y-2 md:grid-cols-[1fr_1.6fr] md:items-center">
            <h3>Situs promosi Vaganza Village</h3>
            <div>
              <p className="text-[#3b4a63]">Pengembangan situs promosi kawasan hunian serta kontribusi pada program pemberdayaan digital di Sinia Coffee, September 2024.</p>
              <OutLink href={repoUrl('Pemograman-Web-Vaganza-Village')!} label="Lihat kode sumber situs Vaganza Village di GitHub">Lihat kode sumber situs</OutLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
