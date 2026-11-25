import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, Maximize2 } from 'lucide-react';
import type { Evidence } from '../data/portfolioData';
import { Img } from '../components/Img';

/** Aksi bersama: membuka bukti dan membuka CV. */
export const Ui = createContext<{ openEvidence: (e: Evidence) => void; openCv: () => void }>({
  openEvidence: () => {}, openCv: () => {},
});
export const useUi = () => useContext(Ui);

const THREADS = {
  kanan: 'M-20 30 C260 30 300 150 620 110 S1120 10 1460 120',
  kiri: 'M1460 40 C1180 20 1060 160 760 120 S240 20 -20 130',
};

/** Fakta kunci: hal pertama yang perlu ditangkap pembaca dari sebuah bagian. */
export const Facts = ({ items }: { items: [label: string, value: string][] }) => (
  <dl className="facts" data-reveal="facts">
    {items.map(([label, value], i) => <div key={label} style={idx(i)}><dt>{label}</dt><dd><span>{value}</span></dd></div>)}
  </dl>
);

export function Section({ id, title, lead, facts, tone, split, thread, className = '', children }: {
  id: string; title: ReactNode; lead?: ReactNode; facts?: [string, string][]; tone?: 'canvas' | 'sky'; split?: boolean; thread?: keyof typeof THREADS; className?: string; children: ReactNode;
}) {
  return (
    <>
    {/* Di luar section karena content-visibility memotong isi yang melewati tepinya. */}
    {thread && <div className="thread-host" aria-hidden="true"><svg className="thread" data-reveal="thread" viewBox="0 0 1440 170" preserveAspectRatio="none"><path pathLength="1" d={THREADS[thread]} /></svg></div>}
    <section id={id} data-tone={tone} aria-labelledby={`${id}-judul`} className={`sec ${className}`}>
      <div className="wrap">
        <div className={`sec-head ${split ? 'split' : ''}`} data-reveal="mark">
          <h2 id={`${id}-judul`}>{title}</h2>
          {lead && <p>{lead}</p>}
        </div>
        {facts && <Facts items={facts} />}
        {children}
      </div>
    </section>
    </>
  );
}

export function EvidenceButton({ evidence, sizes, className = '' }: { evidence: Evidence; sizes: string; className?: string }) {
  const { openEvidence } = useUi();
  return (
    <button type="button" className={`ev ${className}`} aria-label={`Perbesar: ${evidence.title}`} onClick={() => openEvidence(evidence)}>
      <Img photo={evidence.photo} sizes={sizes} />
      <span className="zoom" aria-hidden="true"><Maximize2 size={16} /></span>
    </button>
  );
}

export function EvidenceLink({ evidence, children }: { evidence: Evidence; children: ReactNode }) {
  const { openEvidence } = useUi();
  return <button type="button" className="link" onClick={() => openEvidence(evidence)}>{children} <Maximize2 aria-hidden="true" /></button>;
}

export const GoLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a className="link" href={href}>{children} <ArrowRight aria-hidden="true" /></a>
);

export const OutLink = ({ href, children, label }: { href: string; children: ReactNode; label?: string }) => (
  <a className="link" href={href} target="_blank" rel="noreferrer" aria-label={label && `${label} (tab baru)`}>
    {children} <ArrowUpRight aria-hidden="true" />{!label && <span className="sr-only">(tab baru)</span>}
  </a>
);

/** Rincian untuk pembaca teknis; pembaca umum boleh melewatinya. */
export const Tech = ({ label = 'Rincian teknis', children }: { label?: string; children: ReactNode }) => (
  <details className="tech">
    <summary>{label} <ChevronDown size={18} aria-hidden="true" /></summary>
    <div className="mt-2 max-w-[70ch]">{children}</div>
  </details>
);

export const idx = (i: number) => ({ '--i': i }) as CSSProperties;

/** Memutar ulang animasi sekali jalan pada elemen data-reveal. */
export function replay(el: HTMLElement) {
  el.removeAttribute('data-shown');
  void el.offsetWidth; // paksa peramban mencatat keadaan awal
  requestAnimationFrame(() => el.setAttribute('data-shown', ''));
}
