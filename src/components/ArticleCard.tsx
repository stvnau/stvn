import { CachedArticle } from "@/lib/cache";

interface ArticleCardProps {
  article: CachedArticle;
  variant?: "featured" | "standard" | "compact";
}

export default function ArticleCard({
  article,
  variant = "standard",
}: ArticleCardProps) {
  const sectionLabel =
    article.interestId.charAt(0).toUpperCase() + article.interestId.slice(1);

  if (variant === "featured") {
    return (
      <article className="pb-5 mb-5 border-b border-rule-light">
        <div className="mb-1">
          <span className="text-[10px] font-[family-name:var(--font-dm-sans)] font-semibold uppercase tracking-[0.15em] text-accent">
            {sectionLabel}
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-headline)] text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-tight mb-2">
          {article.reframedHeadline}
        </h2>
        <p className="text-[11px] font-[family-name:var(--font-dm-sans)] text-ink-muted uppercase tracking-wider mb-4">
          {article.sourceName} &middot;{" "}
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <div className="article-body max-w-3xl">
          <p className="font-[family-name:var(--font-serif)]">
            {article.reframedSummary}
          </p>
        </div>
        <WhatThisMeans text={article.whatThisMeans} />
        <OriginalSource
          headline={article.originalHeadline}
          url={article.sourceUrl}
          source={article.sourceName}
        />
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="pb-4 mb-4 border-b border-rule-light last:border-b-0">
        <span className="text-[9px] font-[family-name:var(--font-dm-sans)] font-semibold uppercase tracking-[0.15em] text-accent">
          {sectionLabel}
        </span>
        <h3 className="font-[family-name:var(--font-headline)] text-base font-bold leading-snug mt-0.5 mb-1">
          {article.reframedHeadline}
        </h3>
        <p className="text-[10px] font-[family-name:var(--font-dm-sans)] text-ink-muted uppercase tracking-wider">
          {article.sourceName}
        </p>
      </article>
    );
  }

  return (
    <article className="pb-4 mb-4 border-b border-rule-light last:border-b-0">
      <span className="text-[9px] font-[family-name:var(--font-dm-sans)] font-semibold uppercase tracking-[0.15em] text-accent">
        {sectionLabel}
      </span>
      <h3 className="font-[family-name:var(--font-headline)] text-xl sm:text-2xl font-bold leading-tight mt-1 mb-2">
        {article.reframedHeadline}
      </h3>
      <p className="text-[11px] font-[family-name:var(--font-dm-sans)] text-ink-muted uppercase tracking-wider mb-2">
        {article.sourceName} &middot;{" "}
        {new Date(article.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </p>
      <p className="font-[family-name:var(--font-serif)] text-sm text-ink-light leading-relaxed text-justify mb-3">
        {article.reframedSummary}
      </p>
      <WhatThisMeans text={article.whatThisMeans} />
      <OriginalSource
        headline={article.originalHeadline}
        url={article.sourceUrl}
        source={article.sourceName}
      />
    </article>
  );
}

function WhatThisMeans({ text }: { text: string }) {
  return (
    <div className="bg-[#f5f0e6] border-l-2 border-positive px-4 py-3 mt-3">
      <p className="text-[10px] font-[family-name:var(--font-dm-sans)] font-semibold uppercase tracking-[0.15em] text-positive mb-1">
        What This Means for You
      </p>
      <p className="font-[family-name:var(--font-serif)] text-sm leading-relaxed text-ink-light">
        {text}
      </p>
    </div>
  );
}

function OriginalSource({
  headline,
  url,
  source,
}: {
  headline: string;
  url: string;
  source: string;
}) {
  return (
    <p className="mt-2 text-[10px] font-[family-name:var(--font-dm-sans)] text-ink-muted">
      Original:{" "}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-accent"
      >
        {headline}
      </a>{" "}
      ({source})
    </p>
  );
}
