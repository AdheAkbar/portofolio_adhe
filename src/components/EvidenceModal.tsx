import { useEffect, useState, type Ref } from 'react';
import { ArrowUpRight, ZoomIn, ZoomOut } from 'lucide-react';
import { CLAIMS, type Evidence } from '../data/portfolioData';
import { asset } from '../lib/asset';
import { Dialog } from './Dialog';
import { Img } from './Img';

export function EvidenceModal({ ref, evidence }: { ref: Ref<HTMLDialogElement>; evidence: Evidence | null }) {
  const [zoom, setZoom] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setZoom(false);
    setFailed(false);
  }, [evidence]);

  return (
    <Dialog ref={ref} titleId="judul-bukti" title={evidence?.title ?? 'Bukti'}>
      {evidence && (
        <>
          <div className="min-h-0 flex-1 overflow-auto bg-canvas p-3 sm:p-5" tabIndex={0} role="group" aria-label="Gambar bukti">
            {failed ? (
              <p role="alert" className="mx-auto max-w-[46ch] py-16 text-center">
                Gambar “{evidence.title}” gagal dimuat. Coba buka berkas aslinya lewat tautan di bawah.
              </p>
            ) : (
              <div onErrorCapture={() => setFailed(true)} className={zoom ? 'w-max' : 'flex justify-center'}>
                <Img
                  key={evidence.id}
                  photo={evidence.photo}
                  eager
                  sizes="(min-width: 64rem) 60rem, 94vw"
                  className={zoom ? 'h-auto w-[max(90rem,180vw)] max-w-none' : 'h-auto max-h-[66dvh] w-auto max-w-full object-contain'}
                />
              </div>
            )}
          </div>
          <div className="shrink-0 border-t border-hair px-5 py-3">
            <p className="meta max-w-[72ch]">
              {evidence.caption} {evidence.status}
              {evidence.claimIds.length > 0 && <> Mendukung: {evidence.claimIds.map((id) => CLAIMS[id].text).join('; ')}.</>}
            </p>
            <div className="flex flex-wrap gap-x-6">
              {!failed && (
                <button type="button" className="link" aria-pressed={zoom} onClick={() => setZoom(!zoom)}>
                  {zoom ? 'Sesuaikan layar' : 'Perbesar'} {zoom ? <ZoomOut aria-hidden="true" /> : <ZoomIn aria-hidden="true" />}
                </button>
              )}
              <a className="link" href={asset(`assets/${evidence.source}`)} target="_blank" rel="noreferrer">
                Buka berkas asli <ArrowUpRight aria-hidden="true" /><span className="sr-only">(tab baru)</span>
              </a>
            </div>
          </div>
        </>
      )}
    </Dialog>
  );
}
