import { ArrowRight, ArrowUpRight, Cable, ClipboardCheck, Download, FileText, Globe } from 'lucide-react';
import { EVIDENCE, EXPERIENCES } from '../data/portfolioData';
import { asset } from '../lib/asset';
import { Section, useUi } from '../lib/ui';
import { Img } from './Img';

const PDF = asset('assets/CV_M_Adhe_Akbar_ATS.pdf');
const ICONS: Record<string, typeof Globe> = { 'r-vaganza': Globe, 'r-teman': ClipboardCheck, 'r-sms': Cable };
const YEARS = [...new Set(EXPERIENCES.map((e) => e.year))];

export function CvOverviewSection() {
  const { openCv } = useUi();
  return (
    <Section id="cv-lengkap" tone="canvas" split title="Riwayat pengalaman" lead="Pilih pengalaman untuk melihat rincian. Informasi lengkap tersedia dalam CV.">
      <ol className="grid gap-y-10">
        {YEARS.map((year) => (
          <li key={year} className="grid gap-x-10 gap-y-4 lg:grid-cols-[11rem_1fr]">
            <p className="year lg:pt-6">{year}</p>
            <ul className="grid gap-4">
              {EXPERIENCES.filter((e) => e.year === year).map(({ id, period, headline, org, role, result, href, photo }) => {
                const Icon = ICONS[id];
                return (
                  <li key={id} id={id} data-reveal>
                    <a href={href} className="job">
                      <span className="job-pic">{photo ? <Img photo={{ ...EVIDENCE[photo].photo, alt: '' }} sizes="9rem" /> : <Icon size={34} strokeWidth={1.75} aria-hidden="true" />}</span>
                      <span>
                        <span className="block text-[clamp(1.125rem,1rem+0.7vw,1.5rem)] leading-snug font-extrabold tracking-tight">{headline}</span>
                        <span className="mt-1.5 block font-semibold text-[#3b4a63]">{org}</span>
                        <span className="meta block">{role}, {period}</span>
                      </span>
                      <span className="job-res"><mark>{result}</mark></span>
                      <span className="job-go" aria-hidden="true"><ArrowRight size={20} /></span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
      <div className="mt-14 flex flex-wrap items-center gap-3">
        <a className="btn btn-ink" href={PDF} download="CV_M_Adhe_Akbar_ATS.pdf"><Download size={18} aria-hidden="true" /> Unduh CV (PDF)</a>
        <button type="button" className="btn btn-line" onClick={openCv}><FileText size={18} aria-hidden="true" /> Tampilkan CV</button>
        <a className="btn" href={PDF} target="_blank" rel="noreferrer">Buka di tab baru <ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
    </Section>
  );
}
