import { Check } from 'lucide-react';
import { GoLink, idx, Section, Tech } from '../lib/ui';

const NODES = [
  { x: 85, y: 150, name: 'Pelanggan' },
  { x: 235, y: 80, name: 'Kabel fiber' },
  { x: 385, y: 150, name: 'Perangkat' },
  { x: 530, y: 80, name: 'Pemantauan' },
];

const CHECKS = ['Survei dari rumah ke rumah', 'Input data melalui aplikasi', 'Validasi kelengkapan data', 'Koordinasi distribusi bantuan'];

export function FieldOperationsSection() {
  return (
    <Section id="field-operations" title={<>Ketelitian kerja <mark>di lapangan</mark></>}>
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="tile bg-sky" data-reveal="ticks">
          <ol className="grid gap-3">
            {CHECKS.map((text, i) => (
              <li key={text} style={idx(i)} className="tick flex items-center gap-4 py-1 text-[clamp(1.125rem,1rem+0.7vw,1.5rem)] font-bold tracking-tight">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sun" aria-hidden="true"><Check size={19} strokeWidth={3} /></span>{text}
              </li>
            ))}
          </ol>
          <h3 className="mt-9">Enumerator data, Teman Baik Lampung</h3>
          <p className="mt-3 text-[#3b4a63]">Mengumpulkan data penerima manfaat dan <b className="text-ink">memastikan integritasnya sebelum bantuan didistribusikan</b>.</p>
          <p className="meta mt-2">Oktober 2023–Juni 2024</p>
        </article>

        <article className="tile bg-ink text-white" data-reveal="line">
          <svg viewBox="0 0 610 215" className="w-full max-sm:hidden" role="img" aria-label="Alur jaringan: rumah pelanggan, kabel fiber, perangkat, dan pemantauan saling terhubung">
            <path className="draw" pathLength="1" d="M85 150 L235 80 L385 150 L530 80" fill="none" stroke="#ffe071" strokeWidth="4" />
            {NODES.map(({ x, y, name }, i) => (
              <g key={name} transform={`translate(${x} ${y})`}>
                <circle r="15" fill="#0b1e3d" stroke="#ffe071" strokeWidth="4" /><circle r="5" fill="#ffe071" />
                <text y={i % 2 ? -32 : 48} textAnchor="middle" fontSize="19" fontWeight="700" fill="#fff">{name}</text>
              </g>
            ))}
          </svg>
          <ol className="grid gap-2 sm:hidden">{NODES.map(({ name }) => <li key={name} className="flex items-center gap-3 text-[1.125rem] font-bold"><span className="size-3 rounded-full bg-sun" aria-hidden="true" />{name}</li>)}</ol>
          <h3 className="mt-7">Teknisi IT dan jaringan, PT SMS</h3>
          <p className="mt-3 text-[#d5e0f0]">Melaksanakan magang SMK pada penyedia layanan internet, meliputi <b className="text-white">pemantauan jaringan, identifikasi gangguan, penyambungan kabel fiber, dan pemeliharaan perangkat</b>.</p>
          <p className="mt-2 text-[0.9375rem] text-[#d5e0f0]">Sumatra Multimedia Solusi, Juni–Oktober 2021</p>
          <div className="[&_.tech>summary]:text-white"><Tech label="Rincian teknis"><p className="text-[#d5e0f0]">Operasional NOC/FOC, pemantauan trafik, pengukuran redaman dengan OPM dan OTDR, fiber optic splicing, serta LAN/WAN dengan MikroTik.</p></Tech></div>
          <GoLink href="#sertifikat">Lihat sertifikat jaringan</GoLink>
        </article>
      </div>
    </Section>
  );
}
