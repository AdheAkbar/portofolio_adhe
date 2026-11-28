import { asset } from '../lib/asset';
import { idx, Section } from '../lib/ui';

const VIDEOS = [
  { file: 'intro-adhe', title: 'Intro diri dalam tiga gaya', text: 'Satu perkenalan disajikan dalam gaya Clean, Energetic, dan Cinematic, lengkap dengan cuplikan kode pengatur waktu teks.', credit: 'Musik: “Night Voyage (Chill Mix)” oleh Screw-Jay, CC BY 3.0. Efek suara CC0.' },
  { file: 'konten-hari01-v2', title: 'Konten “Hari 01”', text: 'Teks muncul mengikuti ucapan, ikon kardus menegaskan topik, dan transisi kilat menandai pergantian bagian.' },
];

export function ContentVideoSection() {
  return (
    <Section id="konten-video" tone="canvas" split facts={[['Format', 'Video vertikal 9:16, 38–53 detik'], ['Peran', 'Talent dan penyuntingan'], ['Alat', 'Remotion, penyunting video berbasis kode']]} title={<>Remotion Edit: <mark>video pendek dengan motion graphic</mark></>} lead="Dua video vertikal dengan takarir, grafis bergerak, dan ajakan di akhir video, disusun agar pesan mudah diikuti di media sosial.">
      <div className="grid gap-x-[min(3.5rem,4vw)] gap-y-12 sm:grid-cols-2 lg:mx-auto lg:max-w-[60rem]">
        {VIDEOS.map(({ file, title, text, credit }, i) => (
          <figure key={file} data-reveal style={idx(i)}>
            <video className="aspect-[9/16] w-full rounded-[22px] bg-ink object-cover" src={asset(`assets/video/${file}.mp4`)} poster={asset(`assets/video/${file}.webp`)} controls playsInline preload="none" aria-label={title} />
            <figcaption><b className="block text-[1.125rem] text-ink">{title}</b> {text}{credit && <span className="meta mt-2 block">{credit}</span>}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
