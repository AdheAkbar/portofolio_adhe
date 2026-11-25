import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { TOOL_LOGOS } from '../data/portfolioData';
import { asset } from '../lib/asset';

/** Dua salinan daftar membuat putaran menyambung; salinan kedua disembunyikan dari pembaca layar. */
export function LogoMarquee() {
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(ref.current!);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="marquee" data-visible={visible || undefined} data-paused={paused || undefined}>
      <div className="marquee-track">
        {[false, true].map((copy) => (
          <ul key={String(copy)} aria-hidden={copy || undefined} aria-label={copy ? undefined : 'Perangkat lunak yang digunakan'}>
            {TOOL_LOGOS.map(({ file, name }) => (
              <li key={file} title={name}><img src={asset(`assets/logos/${file}.svg`)} alt={copy ? '' : name} width="64" height="64" loading="lazy" decoding="async" /></li>
            ))}
          </ul>
        ))}
      </div>
      <button type="button" className="link motion-reduce:hidden" onClick={() => setPaused(!paused)}>
        {paused ? <>Jalankan gerakan <Play aria-hidden="true" /></> : <>Hentikan gerakan <Pause aria-hidden="true" /></>}
      </button>
    </div>
  );
}
