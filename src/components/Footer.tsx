export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 pb-6">
      <div className="border-t-[3px] border-double border-ink mb-4" />
      <div className="text-center font-[family-name:var(--font-dm-sans)]">
        <p className="text-xs text-ink-muted tracking-wider uppercase mb-1">
          Copyright {year} STVN ST Journal. All Rights Reserved.
        </p>
        <p className="text-[10px] text-ink-muted tracking-wide italic">
          You are doing great.
        </p>
      </div>
    </footer>
  );
}
