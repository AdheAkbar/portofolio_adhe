import './index.css';

const root = document.getElementById('root') as HTMLElement;
const start = () => import('./boot').then(({ boot }) => boot(root));

if (!root.firstElementChild) start();
else {
  // HTML sudah lengkap, jadi React baru dijalankan saat ada interaksi atau setelah halaman tenang.
  const events = ['pointermove', 'pointerdown', 'touchstart', 'keydown', 'scroll', 'focusin'];
  const pending: HTMLElement[] = [];
  // Tautan, details, dan popover bekerja tanpa React. Tombol lain disimpan lalu diklik ulang setelah siap.
  const hold = (e: Event) => {
    const button = (e.target as Element).closest<HTMLElement>('button:not([popovertarget])');
    if (button && root.contains(button)) pending.push(button);
  };
  let started = false;
  const go = () => {
    if (started) return;
    started = true;
    events.forEach((type) => removeEventListener(type, go, true));
    start().then(() => setTimeout(() => {
      root.removeEventListener('click', hold, true);
      document.documentElement.dataset.ready = '';
      pending.forEach((button) => button.click());
    }, 60));
  };
  root.addEventListener('click', hold, true);
  events.forEach((type) => addEventListener(type, go, { capture: true, passive: true }));
  addEventListener('load', () => setTimeout(go, 6000));
}
