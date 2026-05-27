import Masthead from "@/components/Masthead";
import ArticleCard from "@/components/ArticleCard";
import SectionHeader from "@/components/SectionHeader";
import LeaderLesson from "@/components/LeaderLesson";
import Footer from "@/components/Footer";
import RefreshButton from "@/components/RefreshButton";
import { readEdition, todayKey } from "@/lib/cache";
import { config } from "@/lib/config";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Home() {
  const now = new Date();
  const edition = await readEdition(todayKey());

  const daysSinceEpoch = Math.floor(now.getTime() / 86400000);
  const editionNumber = daysSinceEpoch - 19000 + 1;

  if (!edition || edition.articles.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Masthead date={now} editionNumber={editionNumber} />
        <div className="py-16 text-center">
          <h2 className="font-[family-name:var(--font-headline)] text-3xl font-bold mb-4">
            No Edition Yet Today
          </h2>
          <p className="font-[family-name:var(--font-serif)] text-ink-light mb-8 max-w-md mx-auto">
            Today&rsquo;s edition hasn&rsquo;t been generated yet. Hit the
            button below to fetch the latest news and create your personal
            broadsheet.
          </p>
          <RefreshButton />
        </div>
        <Footer />
      </div>
    );
  }

  const articles = edition.articles;
  const lead = articles[0];
  const remaining = articles.slice(1);

  const interestGroups = new Map<string, typeof articles>();
  for (const article of remaining) {
    const group = interestGroups.get(article.interestId) ?? [];
    group.push(article);
    interestGroups.set(article.interestId, group);
  }

  const interestLabels = Object.fromEntries(
    config.interests.map((i) => [i.id, i.label])
  );

  const groupEntries = Array.from(interestGroups.entries());
  const leftGroups = groupEntries.filter((_, i) => i % 2 === 0);
  const rightGroups = groupEntries.filter((_, i) => i % 2 === 1);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <Masthead date={now} editionNumber={editionNumber} />

      {/* Lead Story */}
      <section className="mt-6">
        <ArticleCard article={lead} variant="featured" />
      </section>

      {/* Three-column section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Left column */}
        <div className="column-rule md:pr-5">
          {leftGroups.map(([interestId, groupArticles]) => (
            <div key={interestId}>
              <SectionHeader
                title={interestLabels[interestId] ?? interestId}
              />
              {groupArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="standard"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Center column - Leader Lesson + Edition Info */}
        <div className="column-rule md:px-5">
          <SectionHeader title="Today&rsquo;s Lesson" />
          <LeaderLesson lesson={edition.leaderLesson} />

          <SectionHeader title="What&rsquo;s News" />
          <div className="space-y-3 mb-4">
            {articles.slice(0, 5).map((a) => (
              <div key={a.id} className="flex gap-2">
                <span className="text-positive font-bold text-sm mt-0.5">
                  ■
                </span>
                <p className="font-[family-name:var(--font-serif)] text-xs leading-relaxed text-ink-light">
                  <span className="font-bold">{a.reframedHeadline}.</span>{" "}
                  {a.reframedSummary.split(". ")[0]}.
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-rule-light pt-3 mt-4">
            <p className="text-[10px] font-[family-name:var(--font-dm-sans)] uppercase tracking-wider text-ink-muted mb-1">
              Edition generated{" "}
              {new Date(edition.generatedAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
            <p className="text-[10px] font-[family-name:var(--font-dm-sans)] text-ink-muted">
              {articles.length} articles across {interestGroups.size + 1}{" "}
              sections
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="md:pl-5">
          {rightGroups.map(([interestId, groupArticles]) => (
            <div key={interestId}>
              <SectionHeader
                title={interestLabels[interestId] ?? interestId}
              />
              {groupArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="standard"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
