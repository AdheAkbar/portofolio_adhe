import { useState } from 'react';
import { RESEARCH } from '../data/portfolioData';
import { matchKeywords } from '../utils/keywordSentiment';

export function SentimentSandbox() {
  const [text, setText] = useState(RESEARCH.sampleCases[0]);
  const { label, positive, negative } = matchKeywords(text);

  return (
    <div className="grid gap-6 py-6 md:grid-cols-[1.5fr_1fr] md:gap-10">
      <div>
        <p className="max-w-[62ch] text-fog">
          Simulasi ini hanya menghitung kata kunci di peramban. Model Naive Bayes dan KNN dari riset tidak dijalankan di sini, jadi hasilnya bukan metrik publikasi.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {RESEARCH.sampleCases.map((sample, i) => (
            <button key={sample} type="button" className="chip" aria-pressed={text === sample} onClick={() => setText(sample)}>Contoh {i + 1}</button>
          ))}
        </div>
        <label htmlFor="ulasan" className="mt-4 mb-1 block font-bold">Teks ulasan</label>
        <textarea id="ulasan" rows={3} value={text} onChange={(e) => setText(e.target.value)} className="field" />
      </div>
      <div aria-live="polite" className="self-start bg-white p-5 text-ink">
        <p className="text-xl font-extrabold">{label}</p>
        <p className="mt-2 text-[0.9375rem]"><b>Kata positif ({positive.length}):</b> {positive.join(', ') || 'tidak ada'}</p>
        <p className="text-[0.9375rem]"><b>Kata negatif ({negative.length}):</b> {negative.join(', ') || 'tidak ada'}</p>
      </div>
    </div>
  );
}
