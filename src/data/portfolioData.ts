/*
 * Sumber tunggal isi situs. Riwayat: CV PDF di public/assets (4 November 2026). Kredensial: scan dokumen penerbit.
 * Publikasi: artikel BITS. Perangkat lunak: isi repositori publik yang dibaca 24 November 2026.
 * Klaim tanpa bukti sengaja tidak ditulis sebagai fakta.
 */

export interface SectionMeta { id: string; nav: string; main?: boolean }

/** Urutan cerita. Id sama dengan anchor versi lama agar tautan yang beredar tetap berfungsi. */
export const SECTIONS: SectionMeta[] = [
  { id: 'hero', nav: 'Beranda' },
  { id: 'profil', nav: 'Profil', main: true },
  { id: 'ringkasan', nav: 'Hasil', main: true },
  { id: 'github-showcase', nav: 'Karya', main: true },
  { id: 'sinta-3-research', nav: 'Penelitian' },
  { id: 'pkm', nav: 'Media pembelajaran' },
  { id: 'bappeda', nav: 'Pengalaman', main: true },
  { id: 'lita-global', nav: 'Pelayanan pelanggan' },
  { id: 'field-operations', nav: 'Operasional lapangan' },
  { id: 'hybrid-skillset', nav: 'Perangkat dan teknologi' },
  { id: 'pendidikan', nav: 'Pendidikan dan data diri' },
  { id: 'kreatif-juara', nav: 'Penghargaan' },
  { id: 'branding', nav: 'Komunikasi publik' },
  { id: 'sertifikat', nav: 'Sertifikat dan dokumen' },
  { id: 'cv-lengkap', nav: 'Riwayat dan CV', main: true },
  { id: 'kontak', nav: 'Kontak', main: true },
];

export interface Photo {
  name: string; // public/assets/opt/<name>-<lebar>.webp
  widths: number[];
  width: number;
  height: number;
  alt: string;
}

export type EvidenceType = 'artikel' | 'foto' | 'tangkapan layar' | 'sertifikat kompetensi' | 'sertifikat pelatihan' | 'piagam' | 'rekonstruksi';

export interface Evidence {
  id: string;
  type: EvidenceType;
  title: string;
  caption: string;
  source: string; // berkas asli di public/assets
  photo: Photo;
  claimIds: ClaimId[];
  date?: string;
  status?: string; // batas pembuktian yang perlu diketahui pembaca
}

/** Klaim utama yang tampil. `where` adalah anchor penjelasannya, `basis` adalah sumbernya. */
export const CLAIMS = {
  riset: { text: '18.869 ulasan, Naive Bayes 88,5%, KNN 87,4%', where: 'sinta-3-research', basis: 'Artikel BITS Vol. 7 No. 4' },
  ekstensi: { text: 'Ekstensi Chrome pengisi formulir MagangHub', where: 'github-showcase', basis: 'Repositori Autofill_maganghub' },
  sop: { text: 'Review SOP dan notulensi rapat lintas bidang', where: 'bappeda', basis: 'CV, tanpa dokumen publik' },
  publikasi: { text: 'Sekitar 30 konten publikasi campuran, termasuk 1 reel', where: 'bappeda', basis: 'CV' },
  talent: { text: 'On-camera talent reel PPID BAPPEDA', where: 'bappeda', basis: 'Tangkapan layar reel dan CV' },
  quiz: { text: 'Jelajah Quiz untuk 60+ siswa kelas 4–6', where: 'pkm', basis: 'CV' },
  lita: { text: 'Rating 5,0 pada tiga layanan', where: 'lita-global', basis: 'Tangkapan layar akun' },
  litaOrder: { text: 'Lebih dari 4.500 order', where: 'lita-global', basis: 'CV, tanpa dasbor order' },
  jaringan: { text: 'Operasional NOC/FOC dan penyambungan fiber', where: 'field-operations', basis: 'CV' },
  lapangan: { text: 'Survei dan validasi data penerima bantuan', where: 'field-operations', basis: 'CV' },
  ipk: { text: 'IPK 3,59 / 4,00, Cum Laude', where: 'pendidikan', basis: 'CV' },
  expo: { text: 'Juara 1 Animasi dan Juara 3 AR/VR', where: 'kreatif-juara', basis: 'Piagam penerbit' },
  expoMl: { text: 'Juara 2 Machine Learning', where: 'kreatif-juara', basis: 'CV, piagam belum tersedia' },
  finalis: { text: 'Finalis Muli Mekhanai Pesawaran dan Jaya Bakery 2023', where: 'branding', basis: 'CV dan dokumentasi' },
  bnsp: { text: 'Sertifikat BNSP KKNI Level II, 2022', where: 'sertifikat', basis: 'Scan, berlaku tiga tahun' },
  kompetensi: { text: 'Sertifikat kompetensi dan pelatihan kampus', where: 'sertifikat', basis: 'Scan penerbit' },
} as const;
export type ClaimId = keyof typeof CLAIMS;

const ph = (name: string, widths: number[], width: number, height: number, alt: string): Photo => ({ name, widths, width, height, alt });

export const EVIDENCE = {
  jurnal: {
    id: 'jurnal', type: 'artikel', title: 'Halaman pertama artikel BITS', source: 'jurnal_sinta3_paper.jpg', claimIds: ['riset'], date: '6 Maret 2026',
    caption: 'Building of Informatics, Technology and Science, Vol. 7 No. 4, Maret 2026, halaman 2335–2348.',
    photo: ph('jurnal', [640, 1200], 1786, 2526, 'Halaman pertama artikel komparasi Naive Bayes dan KNN di jurnal BITS, penulis M Adhe Akbar dan Fenty Ariany'),
  },
  pkmKelas: {
    id: 'pkmKelas', type: 'foto', title: 'Sesi kelas di SD Negeri 2 Bumisari', source: 'pkm_jelajah_quiz_2.jpg', claimIds: ['quiz'],
    caption: 'Kegiatan PKM, September–Oktober 2025.',
    photo: ph('pkm-kelas', [640, 1280], 1920, 2560, 'Dua mahasiswa beralmamater marun mendampingi siswa SD di ruang kelas pinus'),
  },
  pkmTim: {
    id: 'pkmTim', type: 'foto', title: 'Tim PKM di SD Negeri 2 Bumisari', source: 'evidence_prev.jpg', claimIds: ['quiz'],
    caption: 'Tim mahasiswa bersama perwakilan sekolah di depan papan nama sekolah.',
    photo: ph('pkm-tim', [640, 1280], 2560, 1920, 'Lima mahasiswa beralmamater marun dan seorang perwakilan sekolah di depan papan nama SDN 2 Bumisari'),
  },
  bappedaCanva: {
    id: 'bappedaCanva', type: 'foto', title: 'Materi publikasi di Canva', source: 'bappeda_acara.jpg', claimIds: ['publikasi'],
    caption: 'Penyusunan materi kegiatan di ruang kerja BAPPEDA.',
    photo: ph('bappeda-canva', [640, 1280], 1600, 1323, 'Monitor menampilkan desain publikasi BAPPEDA Provinsi Lampung di Canva beserta deretan foto kegiatan'),
  },
  bappedaRapat: {
    id: 'bappedaRapat', type: 'foto', title: 'Kegiatan di BAPPEDA Provinsi Lampung', source: 'bappeda_talent.jpg', claimIds: [], status: 'Menunjukkan tempat kegiatan, bukan isi notulensi.',
    caption: 'Dokumentasi ruang rapat. Berkas asli berukuran 410 × 307 piksel.',
    photo: ph('bappeda-rapat', [410], 410, 307, 'Ruang rapat bertulisan BAPPEDA Provinsi Lampung dengan pembicara di meja depan'),
  },
  bappedaReel: {
    id: 'bappedaReel', type: 'tangkapan layar', title: 'Talent reel PPID BAPPEDA', source: 'bappeda_talent_reel.jpg', claimIds: ['talent'],
    caption: 'Tangkapan layar reel “Cuma Modal HP, Suara Kamu Nyampe ke DPRD!” pada akun ppid_bappedalpg.',
    photo: ph('bappeda-talent', [360, 610], 610, 760, 'Reel PPID BAPPEDA tentang Lampung-In: tiga talent memegang ponsel, M. Adhe Akbar di tengah memakai almamater marun'),
  },
  bappedaTim: {
    id: 'bappedaTim', type: 'foto', title: 'Bersama rekan magang', source: 'bappeda_team.jpg', claimIds: [],
    caption: 'Foto bersama selama magang di BAPPEDA Provinsi Lampung.',
    photo: ph('bappeda-tim', [640, 1280], 2560, 1920, 'Delapan orang berfoto di lobi, beberapa memakai almamater kampus'),
  },
  expoAnimasi: {
    id: 'expoAnimasi', type: 'foto', title: 'Tim animasi di Academic Expo 2025', source: 'foto_expo_animasi.jpg', claimIds: ['expo'],
    caption: 'Karya tim Kelompok Pemula.',
    photo: ph('expo-animasi', [640, 960], 960, 1280, 'Tim animasi berfoto di arena Academic Expo, satu anggota memegang laptop berisi karya'),
  },
  expoAr: {
    id: 'expoAr', type: 'foto', title: 'Tim Teknokrat Portal AR', source: 'foto_tim_arvr.jpg', claimIds: ['expo'],
    caption: 'Karya tim Recyle - Teknokrat Portal AR, Academic Expo 2025.',
    photo: ph('expo-ar', [640, 1280], 1920, 2560, 'Lima anggota tim memegang piala dan piagam di depan spanduk Robotic and Automation'),
  },
  runway: {
    id: 'runway', type: 'foto', title: 'Teknokrat Entrepreneur Vaganza', source: 'evidence_local_fashion.jpg', claimIds: [], date: 'Agustus 2023',
    caption: 'Peragaan busana, Agustus 2023.',
    photo: ph('runway', [640, 1280], 2560, 1708, 'Adhe di panggung memakai atasan hitam bermotif tapis emas'),
  },
  fashion: {
    id: 'fashion', type: 'foto', title: 'Pemotretan busana lokal', source: 'evidence_fashion_show_lokal.jpg', claimIds: [],
    caption: 'Dokumentasi pemotretan busana.',
    photo: ph('fashion', [640, 1200], 1705, 2560, 'Adhe berpose memakai atasan hitam bermotif tapis emas di depan kolam dan ornamen bata'),
  },
  mekhanai: {
    id: 'mekhanai', type: 'foto', title: 'Muli Mekhanai Pesawaran 2023', source: 'evidence_muli_mekhanai_pesawaran.jpg', claimIds: ['finalis'], date: '2023',
    caption: 'Dokumentasi finalis.',
    photo: ph('mekhanai', [640, 1170], 1170, 1595, 'Enam peserta berfoto di depan bangunan kayu melengkung'),
  },
  jaya: {
    id: 'jaya', type: 'foto', title: 'Brand Ambassador Jaya Bakery 2023', source: 'evidence_jaya_bakery_2023.jpg', claimIds: ['finalis'], date: '2023',
    caption: 'Poster finalis Pemilihan Brand Ambassador.',
    photo: ph('jaya-bakery', [640, 1080], 1080, 1080, 'Poster Pemilihan Brand Ambassador Jaya Bakery dengan delapan finalis'),
  },
  quizIpa: {
    id: 'quizIpa', type: 'rekonstruksi', title: 'Layar kuis IPA Jelajah Quiz', source: 'jelajah_quiz_layar_ipa.png', claimIds: ['quiz'],
    caption: 'Disusun ulang dari aset, teks, dan koordinat di berkas sumber jelajahQuiss.capx. Bukan rekaman layar saat dimainkan.',
    photo: ph('quiz-ipa', [640, 1280], 1280, 720, 'Layar kuis: papan kayu bertanya hewan berkaki empat dengan pilihan ayam, kucing, bebek, dan ulat bulu'),
  },
  quizMenu: {
    id: 'quizMenu', type: 'rekonstruksi', title: 'Layar pilihan soal Jelajah Quiz', source: 'jelajah_quiz_menu.png', claimIds: ['quiz'],
    caption: 'Disusun ulang dari aset, teks, dan koordinat di berkas sumber jelajahQuiss.capx. Bukan rekaman layar saat dimainkan.',
    photo: ph('quiz-menu', [640, 1280], 1280, 720, 'Layar pilihan soal dengan tombol MTK, IPA, dan IPS pada papan kayu'),
  },
  ekstensiForm: {
    id: 'ekstensiForm', type: 'rekonstruksi', title: 'Formulir uji MagangHub', source: 'ekstensi_maganghub_form.png', claimIds: ['ekstensi'],
    caption: 'Halaman simulasi test_form_maganghub.html dari repositori, dirender tanpa menjalankan skrip.',
    photo: ph('ekstensi-form', [640, 1280], 1500, 1350, 'Formulir Tambah Sertifikasi dengan kolom nama, lembaga, nilai, dan tanggal'),
  },
  ekstensiPanel: {
    id: 'ekstensiPanel', type: 'rekonstruksi', title: 'Panel samping ekstensi', source: 'ekstensi_maganghub_panel.png', claimIds: ['ekstensi'],
    caption: 'Halaman sidepanel.html dari repositori, dirender tanpa menjalankan skrip. Kunci API dihapus dari salinan sebelum dirender.',
    photo: ph('ekstensi-panel', [420, 840], 840, 1420, 'Panel MagangHub Auto-Filler dengan area unggah dokumen, opsi ekstraksi, dan tombol pindai'),
  },
  litaUlasan: {
    id: 'litaUlasan', type: 'tangkapan layar', title: 'Rating layanan Lita', source: 'evidence_lita_reviews.jpg', claimIds: ['lita'], date: 'November 2026', status: 'Diambil November 2026, sedangkan periode kerja di CV berakhir Agustus 2026.',
    caption: 'Rating 5.0 dengan 4.694, 142, dan 56 ulasan pada tiga layanan.',
    photo: ph('lita-ulasan', [575], 575, 1280, 'Tangkapan layar layanan Lita: Mobile Legends 5.0 dari 4.694 ulasan, Teman Curhat 5.0 dari 142, Sleep Call 5.0 dari 56'),
  },
  piagamAnimasi: {
    id: 'piagamAnimasi', type: 'piagam', title: 'Juara 1 Animasi 2D/3D', source: 'sertif_animasi.jpg', claimIds: ['expo'], date: '12 Juni 2025',
    caption: 'No. 050/UTI/A-EXPO/B.12/VI/2025, diberikan kepada Kelompok Pemula, 12 Juni 2025.',
    photo: ph('piagam-animasi', [320, 1400], 1280, 905, 'Sertifikat penghargaan Juara 1 Animasi 2D/3D Teknokrat Academic Expo 2025'),
  },
  piagamAr: {
    id: 'piagamAr', type: 'piagam', title: 'Juara 3 AR/VR', source: 'sertif_arvr.jpg', claimIds: ['expo'], date: '31 Januari 2025',
    caption: 'No. 062/UTI/A-EXPO/B.11/I/2025, diberikan kepada Recyle - Teknokrat Portal AR, 31 Januari 2025.',
    photo: ph('piagam-ar', [320, 1400], 2560, 1809, 'Piagam penghargaan Juara 3 Augmented Reality dan Virtual Reality Teknokrat Academic Expo 2025'),
  },
  pkmPraktik: {
    id: 'pkmPraktik', type: 'foto', title: 'Pendampingan siswa', source: 'pkm_jelajah_quiz_1.jpg', claimIds: ['quiz'],
    caption: 'Kegiatan PKM di SD Negeri 2 Bumisari, September–Oktober 2025.',
    photo: ph('pkm-praktik', [640, 1280], 1920, 2560, 'Mahasiswa beralmamater marun mendampingi dua siswa SD di meja kelas berdinding hijau'),
  },
  wisuda: {
    id: 'wisuda', type: 'foto', title: 'Wisuda S1 Informatika', source: 'adhe_wisuda_full.jpg', claimIds: ['ipk'],
    caption: 'Foto wisuda Universitas Teknokrat Indonesia. Pratinjau dipotong dan dicerahkan, berkas asli tetap utuh.', status: 'Mendampingi riwayat studi, bukan dokumen nilai.',
    photo: ph('wisuda', [480, 640], 640, 930, 'Adhe berselempang nama memegang map ijazah di halaman bertanaman hijau'),
  },
} satisfies Record<string, Evidence>;

export type EvidenceKey = keyof typeof EVIDENCE;

const UTI = 'Universitas Teknokrat Indonesia, LPBM Teknokrat';

export type DocKind = 'kompetensi' | 'pelatihan' | 'penghargaan' | 'publikasi';
export const DOC_KINDS: { id: DocKind; label: string }[] = [
  { id: 'kompetensi', label: 'Kompetensi' },
  { id: 'pelatihan', label: 'Pelatihan' },
  { id: 'penghargaan', label: 'Penghargaan' },
  { id: 'publikasi', label: 'Publikasi' },
];
export interface DocEntry { kind: DocKind; issuer: string; year: string; validity: string; evidence: Evidence }

const cert = (id: string, claim: ClaimId, title: string, caption: string, source: string, photo: Photo, date: string): Evidence =>
  ({ id, type: 'sertifikat kompetensi', title, caption, source, photo, date, claimIds: [claim] });

const NO_VALIDITY = '';

export const DOCUMENTS: DocEntry[] = [
  {
    kind: 'kompetensi', issuer: UTI, year: '2026', validity: NO_VALIDITY,
    evidence: cert('certJaringan', 'kompetensi', 'Kompetensi Jaringan Komputer dan Troubleshooting', 'No. 0030/G.121/IIa2.3/2026, 4 Februari 2026.', '03_Sertifikat_Kompetensi_Jaringan_dan_Troubleshooting.jpg', ph('cert-jaringan', [320, 1400], 1600, 1107, 'Scan sertifikat Kompetensi Jaringan Komputer dan Troubleshooting'), '4 Februari 2026'),
  },
  {
    kind: 'kompetensi', issuer: UTI, year: '2026', validity: NO_VALIDITY,
    evidence: cert('certDesain', 'kompetensi', 'Kompetensi Desain Grafis', 'No. 0007/G.121/IIa2.3/2026, 22 Januari 2026.', '04_Sertifikat_Kompetensi_Desain_Grafis.jpg', ph('cert-desain', [320, 1400], 1600, 1129, 'Scan sertifikat Kompetensi Desain Grafis'), '22 Januari 2026'),
  },
  {
    kind: 'kompetensi', issuer: UTI, year: '2025', validity: NO_VALIDITY,
    evidence: cert('certAdmin', 'kompetensi', 'Kompetensi Komputer Administrasi Perkantoran', 'No. 0248/G.121/IIa2.1/2025, 15 September 2025.', '01_Sertifikat_Kompetensi_Administrasi_Perkantoran.jpg', ph('cert-admin', [320, 1400], 1600, 1116, 'Scan sertifikat Kompetensi Komputer Administrasi Perkantoran'), '15 September 2025'),
  },
  {
    kind: 'kompetensi', issuer: 'BNSP, LSP SMKN 1 Bandar Lampung', year: '2022', validity: 'Terbit 6 Juni 2022, berlaku 3 tahun. Perpanjangan belum tersedia.',
    evidence: {
      ...cert('certBnsp', 'bnsp', 'Teknisi Jaringan dan Sistem Komputer, KKNI Level II', 'No. 26210 3513 2 0000033 2022, Reg. J.777 00014 2022.', '05_Sertifikat_BNSP_Teknisi_Jaringan_dan_Sistem_Komputer.jpg', ph('cert-bnsp', [320, 1400], 1088, 1600, 'Scan sertifikat kompetensi BNSP Teknisi Jaringan dan Sistem Komputer atas nama M. Adhe Akbar'), '6 Juni 2022'),
      status: 'Masa berlaku yang tercetak sudah lewat dan bukti perpanjangan belum tersedia.',
    },
  },
  {
    kind: 'pelatihan', issuer: UTI, year: '2025', validity: 'Pelatihan kampus',
    evidence: { ...cert('certMikrotik', 'kompetensi', 'Pelatihan MikroTik', 'No. 0059/G.121/IIb2.3/2025, 5 Mei 2025.', '02_Sertifikat_Pelatihan_MikroTik.jpg', ph('cert-mikrotik', [320, 1400], 1600, 1130, 'Scan sertifikat Pelatihan MikroTik'), '5 Mei 2025'), type: 'sertifikat pelatihan' },
  },
  { kind: 'penghargaan', issuer: 'Teknokrat Academic Expo', year: '2025', validity: 'Diberikan kepada tim Kelompok Pemula', evidence: EVIDENCE.piagamAnimasi },
  { kind: 'penghargaan', issuer: 'Teknokrat Academic Expo', year: '2025', validity: 'Diberikan kepada tim Recyle - Teknokrat Portal AR', evidence: EVIDENCE.piagamAr },
  { kind: 'publikasi', issuer: 'Building of Informatics, Technology and Science', year: '2026', validity: 'Artikel jurnal ilmiah', evidence: EVIDENCE.jurnal },
];

export const CONTACT = {
  email: 'akbarade496@gmail.com',
  phone: '+62 895-6365-71654',
  whatsappUrl: 'https://wa.me/62895636571654?text=Halo%20Adhe%2C%20saya%20melihat%20portofolio%20Anda.',
  linkedin: { handle: 'madheakbar', url: 'https://linkedin.com/in/madheakbar' },
  github: { handle: 'AdheAkbar', url: 'https://github.com/AdheAkbar' },
};

export const RESEARCH = {
  title: 'Komparasi Algoritma Naive Bayes dan K-Nearest Neighbor untuk Analisis Sentimen Pengguna Dompet Digital pada Google Play Store',
  journal: 'Building of Informatics, Technology and Science (BITS), Vol. 7 No. 4, Maret 2026, hlm. 2335–2348',
  authors: 'M Adhe Akbar dan Fenty Ariany',
  articleUrl: 'https://ejurnal.seminar-id.com/index.php/bits/article/view/9285',
  doiUrl: 'https://doi.org/10.47065/bits.v7i4.9285',
  models: [
    { name: 'Naive Bayes', accuracy: 88.5 },
    { name: 'K-Nearest Neighbor', accuracy: 87.4 },
  ],
  sampleCases: [
    'Aplikasi sangat mudah untuk bayar dan beli pulsa tanpa kendala, transaksi cepat dan fitur lengkap!',
    'Saldo sudah terpotong tapi uang belum masuk ke akun tujuan, transaksi sering gagal dan sangat mengecewakan.',
    'Fitur baru cukup membantu untuk cek mutasi berkala, namun tampilan mohon jangan terlalu ramai.',
  ],
};

export interface Experience {
  id: string;
  year: string;
  period: string;
  headline: string; // apa yang dikerjakan, dalam bahasa sehari-hari
  org: string;
  role: string;
  result: string; // hal yang paling perlu diingat dari pengalaman ini
  href: string;
  photo?: EvidenceKey;
}

/** Riwayat untuk section CV, terbaru lebih dulu. Baris tanpa foto memakai ikon. */
export const EXPERIENCES: Experience[] = [
  { id: 'r-pkm', year: '2025', period: 'September–Oktober 2025', headline: 'Pengembangan game edukasi untuk siswa sekolah dasar', org: 'SD Negeri 2 Bumisari, program PKM', role: 'Pengembang game dan pendamping literasi digital', result: '60+ siswa', href: '#pkm', photo: 'pkmKelas' },
  { id: 'r-bappeda', year: '2025', period: 'Juli–September 2025', headline: 'Administrasi, pembakuan SOP, dan publikasi', org: 'BAPPEDA Provinsi Lampung', role: 'Magang administrasi IT, humas, dan konten digital', result: 'Sekitar 30 konten', href: '#bappeda', photo: 'bappedaCanva' },
  { id: 'r-lita', year: '2024', period: 'September 2024–Agustus 2026', headline: 'Pelayanan pelanggan digital', org: 'Lita Global', role: 'Pekerja lepas layanan interaktif', result: 'Rating 5,0', href: '#lita-global', photo: 'litaUlasan' },
  { id: 'r-vaganza', year: '2024', period: 'September 2024', headline: 'Pengembangan situs promosi kawasan hunian', org: 'Vaganza Village dan Sinia Coffee, program PKM', role: 'Pengembang web dan branding digital', result: 'Situs promosi', href: '#pkm-vaganza' },
  { id: 'r-teman', year: '2023', period: 'Oktober 2023–Juni 2024', headline: 'Pendataan dan validasi penerima bantuan', org: 'Teman Baik Lampung', role: 'Petugas pendataan lapangan dan distribusi', result: 'Validasi data', href: '#field-operations' },
  { id: 'r-sms', year: '2021', period: 'Juni–Oktober 2021', headline: 'Operasional jaringan dan dukungan IT', org: 'PT SMS (Sumatra Multimedia Solusi)', role: 'Magang SMK, teknisi IT dan jaringan', result: 'Jaringan fiber', href: '#field-operations' },
];

export const SKILL_GROUPS: { title: string; items: { tools: string; use: string }[]; href: string; link: string }[] = [
  {
    title: 'Pengembangan aplikasi dan pengolahan data', href: '#github-showcase', link: 'Lihat karya terkait',
    items: [
      { tools: 'JavaScript, Next.js, React, PHP', use: 'Pengembangan situs web dan ekstensi peramban' },
      { tools: 'Kotlin, Jetpack Compose', use: 'Pengembangan aplikasi Android' },
      { tools: 'Python', use: 'Pengolahan dan klasifikasi data teks' },
      { tools: 'VS Code, Git, GitHub', use: 'Penulisan dan pengelolaan versi kode' },
    ],
  },
  {
    title: 'Administrasi dan jaringan', href: '#bappeda', link: 'Lihat pengalaman terkait',
    items: [
      { tools: 'Microsoft Word, Excel, PowerPoint', use: 'Penyusunan SOP, notulensi, dan laporan' },
      { tools: 'MikroTik, OPM, OTDR', use: 'Konfigurasi jaringan dan identifikasi gangguan' },
      { tools: 'Aplikasi pendataan mobile', use: 'Pengumpulan data di lapangan' },
    ],
  },
  {
    title: 'Publikasi dan komunikasi', href: '#bappeda-publikasi', link: 'Lihat dokumentasi',
    items: [
      { tools: 'CapCut', use: 'Penyuntingan video' },
      { tools: 'Canva, Figma', use: 'Desain materi publikasi dan antarmuka' },
      { tools: 'Penulisan naskah dan on-camera', use: 'Penyampaian informasi kepada publik' },
    ],
  },
];

/** Berkas di public/assets/logos. Logo adalah merek pemiliknya masing-masing. */
export const TOOL_LOGOS = [
  { file: 'claude-code', name: 'Claude Code' },
  { file: 'hermes', name: 'Hermes Agent' },
  { file: 'gemini', name: 'Gemini' },
  { file: 'chatgpt', name: 'ChatGPT' },
  { file: 'microsoft-office', name: 'Microsoft Office' },
  { file: 'mysql', name: 'MySQL' },
  { file: 'docker', name: 'Docker' },
  { file: 'xampp', name: 'XAMPP' },
  { file: 'github', name: 'GitHub' },
  { file: 'capcut', name: 'CapCut' },
  { file: 'meitu', name: 'Meitu' },
];

export interface OtherProject { name: string; title: string; kind: string; stack: string; detail: string }

export const OTHER_PROJECTS: OtherProject[] = [
  { name: 'coffee_wan', title: 'AromaSource Global, situs B2B ekspor kopi', kind: 'Proyek pribadi, ada di CV', stack: 'PHP MVC, MySQL', detail: 'Menyediakan katalog produk dan formulir permintaan dengan struktur MVC tanpa framework. Nama usaha dan testimoni merupakan data contoh.' },
  { name: 'Penakluk-Code', title: 'Situs pemasaran properti', kind: 'Proyek tim kuliah, di luar CV', stack: 'Next.js, TypeScript, Prisma, Cloudinary', detail: 'Menyediakan katalog unit, pencarian, dan formulir kontak. Proyek akhir mata kuliah Pemrograman Web 2.' },
  { name: 'adhemology', title: 'Adimology, kalkulator target saham', kind: 'Turunan karya pihak ketiga, ada di CV', stack: 'Next.js, TypeScript, Supabase, Playwright', detail: 'Dikembangkan dari karya Bhakti Utama sehingga tidak ditempatkan sebagai karya utama.' },
];

export type RepoKind = 'pribadi' | 'tim' | 'pihak-ketiga' | 'kosong';

export const REPO_KINDS: { id: RepoKind; label: string }[] = [
  { id: 'pribadi', label: 'Pribadi dan latihan' },
  { id: 'tim', label: 'Tim' },
  { id: 'pihak-ketiga', label: 'Turunan pihak ketiga' },
  { id: 'kosong', label: 'Tanpa kode' },
];

export interface Repo { name: string; kind: RepoKind; language: string; pushed: string; description: string }

/** Cuplikan api.github.com/users/AdheAkbar/repos. "kosong" = ukuran 0 KB atau hanya berkas awal. */
export const REPO_SNAPSHOT_DATE = '23 November 2026';

const repo = (name: string, kind: RepoKind, language: string, pushed: string, description: string): Repo => ({ name, kind, language, pushed, description });

export const REPOS: Repo[] = [
  repo('Scripting-affiliate', 'pribadi', 'TypeScript', '2026-11-23', 'Affiliate Script Studio: penyusun naskah video affiliate dari tautan produk hingga teleprompter.'),
  repo('Clipper', 'pribadi', 'Kotlin', '2026-11-11', 'Pembuat cuplikan video otomatis dengan Gemini.'),
  repo('portofolio_adhe', 'pribadi', 'TypeScript', '2026-11-04', 'Kode situs portofolio ini.'),
  repo('Portofolio-Adhe', 'pribadi', 'TypeScript', '2026-11-04', 'Repositori portofolio terpisah.'),
  repo('Porto-Angel', 'pribadi', 'CSS', '2026-11-03', 'Situs portofolio statis untuk orang lain.'),
  repo('ryan_pools_bar', 'pribadi', 'PHP', '2026-11-02', 'Pemesanan meja biliar: status meja, reservasi, dan daftar tunggu.'),
  repo('menu_cafe', 'pribadi', 'PHP', '2026-11-02', 'Menu dan kasir kafe: pesanan per meja, QRIS, struk, riwayat.'),
  repo('csirt-incident-portal', 'pribadi', 'HTML', '2026-11-02', 'Portal pelaporan insiden siber dengan dashboard admin.'),
  repo('coffee_wan', 'pribadi', 'PHP', '2026-11-02', 'Situs B2B ekspor kopi dengan PHP MVC.'),
  repo('Pemograman-Web-Vaganza-Village', 'tim', 'PHP', '2026-11-02', 'Situs pemasaran kawasan hunian Vaganza Village, program PKM.'),
  repo('Jelajah-quiz', 'tim', 'Construct 3', '2026-11-02', 'Game kuis edukasi untuk program PKM.'),
  repo('DVWA-master', 'pihak-ketiga', 'PHP', '2026-11-02', 'Salinan Damn Vulnerable Web Application untuk latihan keamanan web.'),
  repo('dashboard', 'pihak-ketiga', 'CSS', '2026-11-02', 'Arsip halaman dashboard bawaan XAMPP.'),
  repo('adhemology', 'pihak-ketiga', 'TypeScript', '2026-10-27', 'Turunan Adimology, kalkulator target saham. Riwayat commit didominasi Bhakti Utama.'),
  repo('Adhebank', 'pribadi', 'Kotlin', '2026-10-27', 'Pencatat pemasukan dan pengeluaran Android.'),
  repo('Ella-Makeup', 'pribadi', 'Kotlin', '2026-10-27', 'Aplikasi pemesanan klien untuk penata rias.'),
  repo('Autofill_maganghub', 'pribadi', 'JavaScript', '2026-10-27', 'Ekstensi Chrome pengisi formulir MagangHub.'),
  repo('teleprompter', 'pribadi', 'JavaScript', '2026-10-27', 'Teleprompter.'),
  repo('juice-reciepe', 'pribadi', 'JavaScript', '2026-10-27', 'Resep jus.'),
  repo('fitness-track', 'pribadi', 'HTML', '2026-10-27', 'Rancangan dan halaman pelacak kebugaran.'),
  repo('DeteksiJantung-Web', 'kosong', '', '2026-10-27', 'Machine learning website dengan case jantung; belum ada isi.'),
  repo('PBS', 'kosong', '', '2025-03-06', 'Belum ada isi.'),
  repo('Penakluk-Code', 'tim', 'TypeScript', '2025-01-25', 'Proyek akhir Pemrograman Web 2, situs properti.'),
  repo('mobile-fix', 'pribadi', 'Dart', '2024-12-17', 'Latihan aplikasi Flutter.'),
  repo('mobile-adhe', 'kosong', '', '2024-12-17', 'Belum ada isi.'),
  repo('mobile2', 'kosong', '', '2024-12-03', 'Belum ada isi.'),
  repo('Adhe-mob', 'kosong', '', '2024-11-19', 'Belum ada isi.'),
  repo('Adhe-mobile2', 'pribadi', 'Dart', '2024-10-31', 'Latihan aplikasi Flutter.'),
  repo('bankgart', 'kosong', '', '2024-05-19', 'Belum ada isi.'),
  repo('UTS-PEMMOBILE-IF22A', 'kosong', '', '2024-05-12', 'Belum ada isi.'),
  repo('uts-project-vaganza', 'kosong', '', '2024-05-12', 'Tugas UTS Pemrograman Mobile; hanya memuat README.'),
];

/**
 * Tautan kode ditahan karena repositori publiknya masih memuat rahasia (API key atau .env), dicek 24 November 2026.
 * Hapus namanya dari sini setelah kunci dicabut dan riwayat commit dibersihkan.
 */
export const HELD_REPOS: string[] = ['Autofill_maganghub', 'Penakluk-Code'];

export const repoUrl = (name: string) => (HELD_REPOS.includes(name) ? null : `https://github.com/AdheAkbar/${name}`);
