import Masthead from "@/components/Masthead";
import MarketTicker from "@/components/MarketTicker";
import ArticleCard from "@/components/ArticleCard";
import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";
import { getDailyContent, getMarketData } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function Home() {
  const now = new Date();
  const { lead, secondary, opinion, editionNumber } = getDailyContent(now);
  const marketData = getMarketData(now);

  const leftColumn = secondary.slice(0, 2);
  const rightColumn = secondary.slice(2, 4);
  const bottomRow = secondary.slice(4, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <Masthead date={now} editionNumber={editionNumber} />
      <MarketTicker items={marketData} />

      {/* Lead Story */}
      <section className="mt-6">
        <ArticleCard article={lead} variant="featured" />
      </section>

      {/* Three-column section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Left column */}
        <div className="column-rule md:pr-5">
          <SectionHeader title="Markets & Finance" />
          {leftColumn.map((article, i) => (
            <ArticleCard key={i} article={article} variant="standard" />
          ))}
        </div>

        {/* Center column - What's News sidebar */}
        <div className="column-rule md:px-5">
          <SectionHeader title="What&rsquo;s News" />
          <div className="bg-[#f5f0e6] border border-rule-light p-4 mb-4">
            <p className="font-[family-name:var(--font-serif)] text-sm leading-relaxed italic text-ink-light">
              &ldquo;The compound effect of daily discipline is the most powerful force
              in personal development. Small, consistent actions today create
              extraordinary results tomorrow.&rdquo;
            </p>
          </div>
          <div className="space-y-3 mb-4">
            <BriefItem text="Personal metrics across all tracked categories continue to trend upward, with momentum accelerating." />
            <BriefItem text="Strategic decisions made earlier this quarter are beginning to yield measurable returns ahead of schedule." />
            <BriefItem text="Industry observers note an emerging pattern of consistent outperformance that defies conventional expectations." />
            <BriefItem text="Health and wellness indicators remain at elevated levels, supporting sustained cognitive performance." />
            <BriefItem text="Network effects from relationship investments are creating compounding opportunities across multiple domains." />
          </div>

          {/* Mini trend visualization */}
          <div className="border-t border-rule-light pt-3 mt-4">
            <p className="text-[10px] font-[family-name:var(--font-dm-sans)] uppercase tracking-wider text-ink-muted mb-2">
              Personal Growth Index — 12 Month Trend
            </p>
            <div className="flex items-end gap-[3px] h-12">
              {[18, 22, 20, 28, 26, 32, 30, 38, 36, 42, 44, 48].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-positive rounded-sm opacity-70"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="md:pl-5">
          <SectionHeader title="Business & Career" />
          {rightColumn.map((article, i) => (
            <ArticleCard key={i} article={article} variant="standard" />
          ))}
        </div>
      </div>

      {/* Bottom section */}
      {bottomRow.length > 0 && (
        <>
          <SectionHeader title="Life & Wellness" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {bottomRow.map((article, i) => (
              <div
                key={i}
                className={i === 0 ? "column-rule sm:pr-5" : "sm:pl-5"}
              >
                <ArticleCard article={article} variant="standard" />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Opinion section */}
      <SectionHeader title="Opinion" />
      <article className="max-w-3xl mx-auto pb-6">
        <h3 className="font-[family-name:var(--font-headline)] text-2xl sm:text-3xl font-bold leading-tight mb-2 text-center">
          {opinion.headline}
        </h3>
        <p className="text-[11px] font-[family-name:var(--font-dm-sans)] text-ink-muted uppercase tracking-wider mb-4 text-center">
          {opinion.byline}
        </p>
        <div className="article-body">
          {opinion.body.map((para, i) => (
            <p key={i} className="font-[family-name:var(--font-serif)]">
              {para}
            </p>
          ))}
        </div>
      </article>

      <Footer />
    </div>
  );
}

function BriefItem({ text }: { text: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-positive font-bold text-sm mt-0.5">■</span>
      <p className="font-[family-name:var(--font-serif)] text-xs leading-relaxed text-ink-light">
        {text}
      </p>
    </div>
  );
}
