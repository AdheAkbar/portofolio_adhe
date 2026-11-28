import { ArrowUp, Check, Copy, Download, Mail, MessageCircle } from 'lucide-react';
import { CONTACT } from '../data/portfolioData';
import { useCopy } from '../hooks/useCopy';
import { asset } from '../lib/asset';
import { OutLink, Section } from '../lib/ui';

export function ContactLoopingSection() {
  const { state, copy } = useCopy();
  return (
    <>
      <Section id="kontak" className="contact" title={<>Konten, publikasi, dan komunikasi <mark>dalam satu rangkaian karya</mark></>} lead="Video, publikasi instansi, peran di depan publik, dan karya digital pada halaman ini merangkum perjalanan saya dari Teknik Komputer dan Jaringan hingga Sarjana Informatika.">
        <div className="flex flex-wrap items-center gap-3">
          <a className="btn bg-sun text-ink hover:bg-white" href={`mailto:${CONTACT.email}`}><Mail size={18} aria-hidden="true" /> {CONTACT.email}</a>
          <a className="btn btn-ghost" href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /> WhatsApp<span className="sr-only"> (tab baru)</span></a>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-1">
          <button type="button" className="link" onClick={() => copy('email', CONTACT.email)}>Salin email {state?.ok ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}</button>
          <OutLink href={CONTACT.linkedin.url}>LinkedIn</OutLink>
          <OutLink href={CONTACT.github.url}>GitHub</OutLink>
          <a className="link" href={asset('assets/CV_M_Adhe_Akbar_ATS.pdf')} download="CV_M_Adhe_Akbar_ATS.pdf">Unduh CV <Download aria-hidden="true" /></a>
        </div>
        <p role="status" className="min-h-7">{state && (state.ok ? 'Email tersalin.' : `Email gagal disalin. Silakan salin manual: ${CONTACT.email}`)}</p>
      </Section>
      <footer className="contact border-t border-white/20">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-5">
          <p className="text-[0.9375rem]">M. Adhe Akbar, S.Kom. Bandar Lampung. Diperbarui November 2026.</p>
          <a className="link" href="#hero">Kembali ke atas <ArrowUp aria-hidden="true" /></a>
        </div>
      </footer>
    </>
  );
}
