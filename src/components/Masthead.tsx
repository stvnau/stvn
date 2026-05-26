import { formatDate } from "@/lib/content";

interface MastheadProps {
  date: Date;
  editionNumber: number;
}

export default function Masthead({ date, editionNumber }: MastheadProps) {
  const year = date.getFullYear();
  const volume = year - 2024;
  const formattedDate = formatDate(date);

  return (
    <header className="pt-4 pb-2">
      <div className="border-t-[3px] border-double border-ink mb-3" />

      <div className="flex items-center justify-between text-[10px] font-[family-name:var(--font-dm-sans)] uppercase tracking-widest text-ink-muted px-1 mb-2">
        <span>Vol. {volume > 0 ? "I".repeat(Math.min(volume, 5)) : "I"} No. {editionNumber}</span>
        <span>stvn.au</span>
      </div>

      <div className="flex items-center gap-4 mb-2">
        <div className="flex-1 border-t border-ink" />
        <h1 className="font-[family-name:var(--font-masthead)] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-center leading-none tracking-tight">
          STVN ST Journal
        </h1>
        <div className="flex-1 border-t border-ink" />
      </div>

      <p className="text-center text-xs font-[family-name:var(--font-dm-sans)] tracking-wider text-ink-muted mb-2">
        {formattedDate}
      </p>

      <div className="border-t border-ink" />
    </header>
  );
}
