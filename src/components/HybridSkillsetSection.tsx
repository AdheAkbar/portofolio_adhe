import { SKILL_GROUPS } from '../data/portfolioData';
import { GoLink, Section } from '../lib/ui';
import { LogoMarquee } from './LogoMarquee';

export function HybridSkillsetSection() {
  return (
    <Section id="hybrid-skillset" tone="canvas" title="Perangkat dan teknologi">
      <LogoMarquee />
      <div className="grid gap-x-[min(3.5rem,4vw)] gap-y-12 lg:grid-cols-3">
        {SKILL_GROUPS.map(({ title, items, href, link }) => (
          <div key={title} className="flex flex-col" data-reveal>
            <h3>{title}</h3>
            <dl className="mt-6 grid gap-5">
              {items.map(({ tools, use }) => <div key={tools}><dt className="text-[1.125rem] leading-snug font-bold">{tools}</dt><dd className="text-fog">{use}</dd></div>)}
            </dl>
            <div className="mt-auto pt-5"><GoLink href={href}>{link}</GoLink></div>
          </div>
        ))}
      </div>

      <div className="tile mt-16 grid items-center gap-x-[min(3.5rem,4vw)] gap-y-6 bg-white lg:grid-cols-[1.1fr_1fr]" data-reveal="mark">
        <p className="text-[clamp(1.5rem,1.1rem+1.6vw,2.35rem)] leading-[1.2] font-bold tracking-tight">Pemanfaatan AI yang selalu disertai <mark>validasi.</mark></p>
        <p className="text-[1.0625rem] text-[#3b4a63]">Claude, ChatGPT, Gemini, dan Hermes Agent digunakan untuk menyusun, mengimplementasikan, atau meninjau pekerjaan. Kode, data, dan hasil akhir divalidasi sebelum digunakan.</p>
      </div>
    </Section>
  );
}
