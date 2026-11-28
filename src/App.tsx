import { Suspense, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { BappedaExperienceSection } from './components/BappedaExperienceSection';
import { CertificateVaultSection } from './components/CertificateVaultSection';
import { ContactLoopingSection } from './components/ContactLoopingSection';
import { CvModal } from './components/CvModal';
import { ContentVideoSection } from './components/ContentVideoSection';
import { CvOverviewSection } from './components/CvOverviewSection';
import { EducationSection } from './components/EducationSection';
import { EvidenceModal } from './components/EvidenceModal';
import { FieldOperationsSection } from './components/FieldOperationsSection';
import { GithubShowcaseSection } from './components/GithubShowcaseSection';
import { HeroSection } from './components/HeroSection';
import { HybridSkillsetSection } from './components/HybridSkillsetSection';
import { LitaGlobalSection } from './components/LitaGlobalSection';
import { MultimediaExpoSection } from './components/MultimediaExpoSection';
import { Navbar } from './components/Navbar';
import { PkmCaseStudiesSection } from './components/PkmCaseStudiesSection';
import { ProfileSection } from './components/ProfileSection';
import { PublicSpeakingBrandingSection } from './components/PublicSpeakingBrandingSection';
import { QuickSummarySection } from './components/QuickSummarySection';
import { SintaResearchSection } from './components/SintaResearchSection';
import type { Evidence } from './data/portfolioData';
import { useReveal } from './hooks/useReveal';
import { Ui } from './lib/ui';

export default function App() {
  const cvRef = useRef<HTMLDialogElement>(null);
  const evidenceRef = useRef<HTMLDialogElement>(null);
  const [cvOpened, setCvOpened] = useState(false);
  const [evidence, setEvidence] = useState<Evidence | null>(null);

  useReveal();

  const ui = useMemo(() => ({
    openCv: () => {
      setCvOpened(true);
      cvRef.current?.showModal();
    },
    openEvidence: (next: Evidence) => {
      flushSync(() => setEvidence(next)); // isi harus siap sebelum dialog memindahkan fokus
      evidenceRef.current?.showModal();
    },
  }), []);

  return (
    <Ui value={ui}>
      <a href="#konten" className="btn btn-ink sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-40">Lewati ke konten</a>
      <Navbar />
      <main id="konten" tabIndex={-1} className="outline-none">
        <HeroSection />
        {/* Tiap Suspense dihidrasi terpisah supaya thread utama tidak terkunci lama. */}
        <Suspense><ProfileSection /></Suspense>
        <Suspense><QuickSummarySection /></Suspense>
        <Suspense><ContentVideoSection /></Suspense>
        <Suspense><BappedaExperienceSection /></Suspense>
        <Suspense><PublicSpeakingBrandingSection /></Suspense>
        <Suspense><MultimediaExpoSection /></Suspense>
        <Suspense><LitaGlobalSection /></Suspense>
        <Suspense><GithubShowcaseSection /></Suspense>
        <Suspense><SintaResearchSection /></Suspense>
        <Suspense><PkmCaseStudiesSection /></Suspense>
        <Suspense><FieldOperationsSection /></Suspense>
        <Suspense><HybridSkillsetSection /></Suspense>
        <Suspense><EducationSection /></Suspense>
        <Suspense><CertificateVaultSection /></Suspense>
        <Suspense><CvOverviewSection /></Suspense>
        <Suspense><ContactLoopingSection /></Suspense>
      </main>
      <EvidenceModal ref={evidenceRef} evidence={evidence} />
      <CvModal ref={cvRef} opened={cvOpened} />
    </Ui>
  );
}
