interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 border-t border-rule-light" />
      <h2 className="text-xs font-[family-name:var(--font-dm-sans)] font-semibold uppercase tracking-[0.2em] text-ink-muted">
        {title}
      </h2>
      <div className="flex-1 border-t border-rule-light" />
    </div>
  );
}
