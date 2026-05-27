import { config } from "./config";
import { fetchNewsForTopic } from "./news";
import { reframeArticle, generateLeaderLesson } from "./reframe";
import {
  CachedArticle,
  DailyEdition,
  LeaderLesson,
  todayKey,
  writeEdition,
} from "./cache";

export async function generateDailyEdition(): Promise<DailyEdition> {
  const date = todayKey();
  const articles: CachedArticle[] = [];
  let articleIndex = 0;

  for (const interest of config.interests) {
    try {
      const rawArticles = await fetchNewsForTopic(
        interest.searchTerms,
        config.articlesPerInterest
      );

      for (const raw of rawArticles) {
        const reframed = await reframeArticle(raw, interest);
        if (reframed) {
          articles.push({
            ...reframed,
            id: `${date}-${articleIndex++}`,
          });
        }
      }
    } catch (e) {
      console.error(`Failed to fetch/reframe for ${interest.id}:`, e);
    }
  }

  let leaderLesson: LeaderLesson;
  try {
    const lesson = await generateLeaderLesson();
    leaderLesson = lesson ?? fallbackLesson();
  } catch {
    leaderLesson = fallbackLesson();
  }

  const edition: DailyEdition = {
    date,
    generatedAt: new Date().toISOString(),
    articles,
    leaderLesson,
  };

  await writeEdition(edition);
  return edition;
}

function fallbackLesson(): LeaderLesson {
  return {
    leaderName: "Marcus Aurelius",
    era: "2nd-century Rome",
    title: "The Emperor Who Wrote to Himself Every Morning",
    story:
      "Marcus Aurelius governed the Roman Empire through plague, war, and political betrayal — yet each morning he sat down and wrote honest reflections to himself. His Meditations were never meant for publication. They were a private discipline: examining his own reactions, reminding himself of principles, preparing mentally for the day's challenges.",
    takeaway:
      "Start your day by writing to yourself — not goals or to-dos, but honest reflection on how you want to show up. The gap between who you are and who you want to be closes fastest when you examine it daily.",
  };
}
