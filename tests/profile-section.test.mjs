import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';
import { CLAIMS, DOC_KINDS, DOCUMENTS, EVIDENCE, EXPERIENCES, HELD_REPOS, OTHER_PROJECTS, REPO_KINDS, REPOS, repoUrl, SECTIONS, SKILL_GROUPS, TOOL_LOGOS } from '../src/data/portfolioData.ts';
import { matchKeywords } from '../src/utils/keywordSentiment.ts';

const url = (path) => new URL(`../${path}`, import.meta.url);
const read = (path) => readFileSync(url(path), 'utf8');
const components = readdirSync(url('src/components')).map((f) => read(`src/components/${f}`)).join('\n');
const visible = components + read('src/data/portfolioData.ts');
const allEvidence = [...new Set([...Object.values(EVIDENCE), ...DOCUMENTS.map((d) => d.evidence)])];

test('CV asli tersedia dan teks ATS bebas karakter rusak', () => {
  assert.ok(existsSync(url('public/assets/CV_M_Adhe_Akbar_ATS.pdf')));
  assert.ok(!/[�￾]/.test(read('src/data/CV_M_Adhe_Akbar_ATS.txt')));
});

test('setiap bukti punya id unik, berkas asli, turunan WebP, alt, dan klaim yang dikenal', () => {
  assert.equal(new Set(allEvidence.map((e) => e.id)).size, allEvidence.length);
  for (const { id, source, photo, claimIds } of allEvidence) {
    assert.ok(existsSync(url(`public/assets/${source}`)), `${id}: ${source}`);
    for (const w of photo.widths) assert.ok(existsSync(url(`public/assets/opt/${photo.name}-${w}.webp`)), `${photo.name}-${w}`);
    assert.ok(photo.alt, id);
    for (const c of claimIds) assert.ok(c in CLAIMS, `${id}: ${c}`);
  }
});

test('setiap klaim mengarah ke section yang ada dan menyebut dasarnya', () => {
  const ids = new Set(SECTIONS.map((s) => s.id));
  for (const [id, { where, basis }] of Object.entries(CLAIMS)) {
    assert.ok(ids.has(where), id);
    assert.ok(basis, id);
  }
  // Klaim tanpa gambar harus bersumber dari CV, bukan mengaku punya bukti visual.
  const proven = new Set(allEvidence.flatMap((e) => e.claimIds));
  for (const [id, { basis }] of Object.entries(CLAIMS)) if (!proven.has(id)) assert.match(basis, /CV/, id);
});

test('anchor versi lama tetap ada', () => {
  const ids = new Set(SECTIONS.map((s) => s.id));
  for (const id of ['hero', 'ringkasan', 'profil', 'cv-lengkap', 'pendidikan', 'hybrid-skillset', 'github-showcase', 'bappeda', 'lita-global', 'field-operations', 'sinta-3-research', 'kreatif-juara', 'pkm', 'branding', 'sertifikat', 'kontak']) assert.ok(ids.has(id), id);
  assert.ok(components.includes('id="peta-posisi"'));
});

test('riwayat dan alat mengarah ke section yang ada', () => {
  const ids = new Set([...SECTIONS.map((s) => s.id), ...components.matchAll(/id="([\w-]+)"/g)].map((m) => (Array.isArray(m) ? m[1] : m)));
  for (const { href } of [...EXPERIENCES, ...SKILL_GROUPS]) assert.ok(ids.has(href.slice(1)), href);
});

test('klaim yang sudah dikoreksi tidak muncul lagi', () => {
  for (const bad of [/seumur hidup/i, /30\+/, /100% ?CSAT/i, /zero dispute/i, /test coverage/i, /TERMINAL LIVE/i, /Sinergi Media/i, /0[.,]02 ?dB/i, /AI Engineer/i, /100% akurasi/i, /terverifikasi/i, /MutationObserver/]) assert.doesNotMatch(visible, bad);
});

test('BNSP menampilkan masa berlaku tercetak, pelatihan tidak disebut sertifikasi vendor', () => {
  const doc = (id) => DOCUMENTS.find((d) => d.evidence.id === id);
  assert.match(doc('certBnsp').validity, /berlaku 3 tahun.*belum tersedia/);
  assert.equal(doc('certMikrotik').kind, 'pelatihan');
  assert.equal(DOCUMENTS.find((d) => d.evidence.id === 'jurnal').kind, 'publikasi');
  assert.ok(DOC_KINDS.every(({ id }) => DOCUMENTS.some((d) => d.kind === id)));
});

test('repositori yang memuat rahasia tidak ditautkan', () => {
  for (const name of HELD_REPOS) {
    assert.equal(repoUrl(name), null);
    assert.ok(!components.includes(`github.com/AdheAkbar/${name}`), name);
  }
  assert.match(repoUrl('Adhebank'), /^https:\/\/github\.com\/AdheAkbar\//);
});

test('arsip repositori unik, berkategori valid, dan memuat proyek yang ditampilkan', () => {
  const names = REPOS.map((r) => r.name);
  const kinds = new Set(REPO_KINDS.map((k) => k.id));
  assert.equal(new Set(names).size, names.length);
  assert.ok(REPOS.every((r) => kinds.has(r.kind)));
  assert.ok(OTHER_PROJECTS.every((p) => names.includes(p.name)));
  assert.equal(REPOS.find((r) => r.name === 'adhemology').kind, 'pihak-ketiga');
});

test('setiap logo aplikasi punya berkas dan nama', () => {
  assert.equal(TOOL_LOGOS.length, 11);
  for (const { file, name } of TOOL_LOGOS) assert.ok(name && existsSync(url(`public/assets/logos/${file}.svg`)), file);
});

test('aset tidak memakai URL absolut yang rusak di subpath', () => {
  assert.ok(!components.includes('"/assets/'));
});

test('simulasi kata kunci mencocokkan kata utuh dan mengaku sebagai simulasi', () => {
  assert.equal(matchKeywords('Transaksi cepat dan mudah').label, 'Positif');
  assert.equal(matchKeywords('Sering gagal dan mengecewakan').label, 'Negatif');
  assert.equal(matchKeywords('').label, 'Netral');
  assert.deepEqual(matchKeywords('kegagalan').negative, []);
  assert.ok(components.includes('tidak dijalankan di sini'));
});

test('nada bahasa: ragam formal, jargon disimpan di rincian teknis', () => {
  const open = components.replace(/<Tech[\s\S]*?<\/Tech>/g, '').replace(/const STATS = [\s\S]*?\];/, '');
  for (const jargon of [/NOC\/FOC/, /StateFlow/, /McNemar/, /Manifest V3/, /prepared statement/, /redaman/]) assert.doesNotMatch(open, jargon);
  for (const informal of [/\bcuma\b/i, /\bkalau\b/i, /\bsupaya\b/i, /\bbikin\b/i, /\bHalo\b/, /\bbisa saya bantu/i, /berkenalan/i, /\bLelah\b/]) assert.doesNotMatch(components.replace(/\{?\/\*[\s\S]*?\*\/\}?|\/\/.*/g, ''), informal);
  assert.ok((components.match(/<mark>/g) ?? []).length >= 8, 'hal penting ditandai stabilo');
});

test('data diri tampil di section pendidikan', () => {
  const edu = read('src/components/EducationSection.tsx');
  assert.match(edu, /182 <span>cm/);
  assert.match(edu, /79 <span>kg/);
  assert.doesNotMatch(components, /78 kg/);
});
