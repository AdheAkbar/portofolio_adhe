import type { ReactNode, Ref } from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  ref: Ref<HTMLDialogElement>;
  titleId: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/** Pembungkus <dialog> native: showModal() memberi Esc, pembatasan fokus, dan pemulihan fokus. */
export function Dialog({ ref, titleId, title, children, className = '' }: DialogProps) {
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className={`dlg ${className}`}
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
    >
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-hair py-2 pr-2 pl-5">
        <h2 id={titleId}>{title}</h2>
        <form method="dialog">
          <button type="submit" aria-label="Tutup dialog" className="grid size-11 place-items-center rounded-full transition-colors hover:bg-blue-wash">
            <X size={22} aria-hidden="true" />
          </button>
        </form>
      </div>
      {children}
    </dialog>
  );
}
