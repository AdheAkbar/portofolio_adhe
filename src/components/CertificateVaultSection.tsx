import { useState } from 'react';
import { DOC_KINDS, DOCUMENTS, type DocKind } from '../data/portfolioData';
import { EvidenceButton, Section, useUi } from '../lib/ui';
import { Img } from './Img';

const [lead] = DOCUMENTS;
const FILTERS: { id: DocKind | 'semua'; label: string; count: number }[] = [
  { id: 'semua', label: 'Semua', count: DOCUMENTS.length },
  ...DOC_KINDS.map(({ id, label }) => ({ id, label, count: DOCUMENTS.filter((d) => d.kind === id).length })),
];

export function CertificateVaultSection() {
  const { openEvidence } = useUi();
  const [filter, setFilter] = useState<DocKind | 'semua'>('semua');
  const shown = DOCUMENTS.filter((d) => filter === 'semua' || d.kind === filter);

  return (
    <Section id="sertifikat" tone="sky" split title="Sertifikat dan dokumen pendukung" lead="Pilih dokumen untuk menampilkan hasil pindai.">
      <div className="grid gap-x-[min(3.5rem,4vw)] gap-y-10 lg:grid-cols-12">
        <figure className="self-start lg:sticky lg:top-28 lg:col-span-5" data-reveal>
          <EvidenceButton evidence={lead.evidence} sizes="(min-width: 64rem) 32rem, 92vw" className="-rotate-1" />
          <figcaption><b className="block text-[1.1875rem] leading-snug text-ink">{lead.evidence.title}</b> Dokumen terbaru, {lead.evidence.date}.</figcaption>
        </figure>
        <div className="lg:col-span-7">
          <div role="group" aria-label="Saring dokumen" className="flex flex-wrap gap-2">
            {FILTERS.map(({ id, label, count }) => <button key={id} type="button" className="chip" aria-pressed={filter === id} onClick={() => setFilter(id)}>{label} ({count})</button>)}
          </div>
          <p role="status" className="sr-only">{shown.length} dokumen ditampilkan</p>
          <ul className="mt-6 grid gap-3">
            {shown.map(({ evidence, issuer, year, validity }) => (
              <li key={evidence.id}>
                <button type="button" onClick={() => openEvidence(evidence)} className="grid w-full grid-cols-[minmax(0,5rem)_minmax(0,1fr)_auto] items-center gap-x-5 rounded-2xl bg-white p-3 pr-5 text-left transition-[translate] duration-200 hover:translate-x-1">
                  <Img photo={{ ...evidence.photo, alt: '' }} sizes="5rem" className="h-16 w-full rounded-lg bg-canvas object-cover object-top" />
                  <span>
                    <b className="block text-[1.0625rem] leading-snug">{evidence.title}</b>
                    <span className="meta block">{issuer}</span>
                    {validity && <span className={`block text-[0.9375rem] leading-snug ${evidence.id === 'certBnsp' ? 'font-semibold text-amber' : 'text-fog'}`}>{validity}</span>}
                  </span>
                  <span className="font-extrabold tabular-nums">{year}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
