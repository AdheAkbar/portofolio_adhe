import { useState, type Ref } from 'react';
import { ArrowUpRight, Check, Copy, Download } from 'lucide-react';
import atsText from '../data/CV_M_Adhe_Akbar_ATS.txt?raw';
import { useCopy } from '../hooks/useCopy';
import { asset } from '../lib/asset';
import { Dialog } from './Dialog';

const FILE_NAME = 'CV_M_Adhe_Akbar_ATS.pdf';
const PDF_URL = asset(`assets/${FILE_NAME}`);
const TABS = [
  { id: 'pdf', label: 'PDF' },
  { id: 'teks', label: 'Teks ATS' },
] as const;

/** `opened` menahan pemuatan PDF sampai dialog pertama kali dibuka. */
export function CvModal({ ref, opened }: { ref: Ref<HTMLDialogElement>; opened: boolean }) {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('pdf');
  const { state, copy } = useCopy();

  return (
    <Dialog ref={ref} titleId="judul-cv" title="CV M. Adhe Akbar" className="h-[calc(100dvh-1.5rem)]">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-hair px-5 py-3">
        <div role="group" aria-label="Format CV" className="flex gap-2">
          {TABS.map(({ id, label }) => (
            <button key={id} type="button" className="chip" aria-pressed={tab === id} onClick={() => setTab(id)}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-5">
          <a className="link" href={PDF_URL} download={FILE_NAME}>
            Unduh PDF <Download aria-hidden="true" />
          </a>
          <a className="link" href={PDF_URL} target="_blank" rel="noreferrer">
            Buka di tab baru <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      {tab === 'pdf' ? (
        <div className="flex min-h-0 flex-1 flex-col bg-canvas">
          {opened && navigator.pdfViewerEnabled !== false ? (
            <iframe src={`${PDF_URL}#navpanes=0&view=FitH`} title="Pratinjau CV M. Adhe Akbar" className="min-h-0 w-full flex-1 border-0" />
          ) : (
            <p className="m-auto max-w-[36ch] p-6 text-center text-fog">
              Peramban ini tidak menampilkan PDF di dalam halaman. Gunakan Unduh PDF atau Buka di tab baru.
            </p>
          )}
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4" tabIndex={0} role="group" aria-label="Teks CV">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <button type="button" className="btn btn-ink" onClick={() => copy('cv', atsText)}>
              {state?.ok ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />} Salin teks CV
            </button>
            <p role="status" className="text-[0.9375rem]">
              {state && (state.ok ? 'Teks CV tersalin.' : 'Gagal menyalin. Pilih teks di bawah, lalu salin manual.')}
            </p>
          </div>
          <pre className="font-sans text-[0.9375rem] leading-relaxed whitespace-pre-wrap">{atsText}</pre>
        </div>
      )}
    </Dialog>
  );
}
