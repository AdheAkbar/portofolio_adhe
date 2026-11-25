import { useEffect, useRef, useState } from 'react';

/** Status sukses hanya muncul setelah writeText benar-benar berhasil. */
export function useCopy() {
  const [state, setState] = useState<{ key: string; ok: boolean } | null>(null);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (key: string, text: string) => {
    let ok = true;
    try {
      await navigator.clipboard.writeText(text); // clipboard tidak tersedia di luar HTTPS; ikut tertangkap
    } catch {
      ok = false;
    }
    setState({ key, ok });
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState(null), 4000);
  };

  return { state, copy };
}
