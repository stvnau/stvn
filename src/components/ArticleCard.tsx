import { Article } from "@/lib/content";

interface ArticleCardProps {
  article: Article;
  variant?: "featured" | "standard" | "compact";
  showBody?: boolean;
}

export default function ArticleCard({
  article,
  variant = "standard",
  showBody = true,
}: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <article className="pb-5 mb-5 border-b border-rule-light">
        <div className="mb-1">
          <span className="text-[10px] font-[family-name:var(--font-dm-sans)] font-semibold uppercase tracking-[0.15em] text-accent">
            {article.section}
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-tight mb-2">
          {article.headline}
        </h2>
        {article.subheadline && (
          <p className="font-[family-name:var(--font-serif)] text-lg text-ink-light leading-snug mb-3 italic">
            {article.subheadline}
          </p>
        )}
        <p className="text-[11px] font-[family-name:var(--font-dm-sans)] text-ink-muted uppercase tracking-wider mb-4">
          {article.byline}
        </p>
        {showBody && (
          <div className="article-body max-w-3xl">
            {article.body.map((para, i) => (
              <p key={i} className="font-[family-name:var(--font-serif)]">
                {para}
              </p>
            ))}
          </div>
        )}
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="pb-4 mb-4 border-b border-rule-light last:border-b-0">
        <span className="text-[9px] font-[family-name:var(--font-dm-sans)] font-semibold uppercase tracking-[0.15em] text-accent">
          {article.section}
        </span>
        <h3 className="font-[family-name:var(--font-headline)] text-base font-bold leading-snug mt-0.5 mb-1">
          {article.headline}
        </h3>
        <p className="text-[10px] font-[family-name:var(--font-dm-sans)] text-ink-muted uppercase tracking-wider">
          {article.byline}
        </p>
      </article>
    );
  }

  return (
    <article className="pb-4 mb-4 border-b border-rule-light last:border-b-0">
      <span className="text-[9px] font-[family-name:var(--font-dm-sans)] font-semibold uppercase tracking-[0.15em] text-accent">
        {article.section}
      </span>
      <h3 className="font-[family-name:var(--font-headline)] text-xl sm:text-2xl font-bold leading-tight mt-1 mb-2">
        {article.headline}
      </h3>
      <p className="text-[11px] font-[family-name:var(--font-dm-sans)] text-ink-muted uppercase tracking-wider mb-2">
        {article.byline}
      </p>
      {showBody && article.body.length > 0 && (
        <p className="font-[family-name:var(--font-serif)] text-sm text-ink-light leading-relaxed text-justify">
          {article.body[0]}
        </p>
      )}
    </article>
  );
}
