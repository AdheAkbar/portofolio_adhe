export const POSITIVE_WORDS = ['cepat', 'mudah', 'bagus', 'keren', 'lancar', 'puas', 'suka', 'mantap', 'bersih', 'aman', 'terbaik', 'stabil', 'lengkap'];
export const NEGATIVE_WORDS = ['lambat', 'gagal', 'kecewa', 'mengecewakan', 'rugi', 'rusak', 'error', 'jelek', 'tertahan', 'buruk', 'parah', 'pending', 'crash', 'terpotong'];

export type KeywordResult = { label: 'Positif' | 'Negatif' | 'Netral'; positive: string[]; negative: string[] };

// shortcut: hanya mencocokkan kata utuh tanpa negasi; ganti bila model riset sungguhan dijalankan.
export function matchKeywords(text: string): KeywordResult {
  const words = new Set(text.toLowerCase().match(/\p{L}+/gu) ?? []);
  const positive = POSITIVE_WORDS.filter((w) => words.has(w));
  const negative = NEGATIVE_WORDS.filter((w) => words.has(w));
  const label = positive.length > negative.length ? 'Positif' : negative.length > positive.length ? 'Negatif' : 'Netral';
  return { label, positive, negative };
}
