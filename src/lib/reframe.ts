import Anthropic from "@anthropic-ai/sdk";
import { config, InterestArea } from "./config";
import { CachedArticle, LeaderLesson } from "./cache";

function getClient(): Anthropic {
  return new Anthropic();
}

export async function fetchAndReframeForInterest(
  interest: InterestArea,
  count: number
): Promise<Omit<CachedArticle, "id">[]> {
  const client = getClient();
  const today = new Date().toISOString().slice(0, 10);

  const prompt = `Search for ${count} recent, real news stories about: ${interest.searchTerms.join(", ")}.
Focus on: ${interest.description}

Find stories from the past few days (today is ${today}). Use web search to find real, current articles.

${config.reframeTone}

For each article you find, return it in the JSON array format below. No other text outside the JSON.
[
  {
    "originalHeadline": "The exact original headline from the source",
    "originalDescription": "1-2 sentence factual summary of what happened",
    "sourceUrl": "The URL of the original article",
    "sourceName": "The publication name",
    "publishedAt": "ISO date string",
    "reframedHeadline": "A WSJ-style headline with an opportunity/growth angle",
    "reframedSummary": "2-3 sentences of accurate reporting. Preserve all facts. WSJ prose style.",
    "whatThisMeans": "2-3 sentences from a mentor's perspective on how this relates to personal growth. Specific and actionable, never generic. Never invent facts."
  }
]`;

  try {
    const message = await client.messages.create({
      model: config.model,
      max_tokens: 2048,
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }],
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") return [];

    const jsonMatch = textBlock.text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return [];

    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((a: Record<string, string>) => ({
      interestId: interest.id,
      originalHeadline: a.originalHeadline ?? "",
      originalDescription: a.originalDescription ?? "",
      sourceUrl: a.sourceUrl ?? "",
      sourceName: a.sourceName ?? "",
      publishedAt: a.publishedAt ?? today,
      reframedHeadline: a.reframedHeadline ?? "",
      reframedSummary: a.reframedSummary ?? "",
      whatThisMeans: a.whatThisMeans ?? "",
    }));
  } catch (e) {
    console.error(`Failed to fetch/reframe for ${interest.label}:`, e);
    return [];
  }
}

export async function generateLeaderLesson(): Promise<LeaderLesson | null> {
  const client = getClient();

  const interestList = config.interests
    .map((i) => `- ${i.label}: ${i.description}`)
    .join("\n");

  const today = new Date().toISOString().slice(0, 10);

  const prompt = `Generate a daily leadership lesson for a personal newspaper dated ${today}.

Pick a historical leader, strategist, entrepreneur, or thinker — someone genuinely impressive.
Vary widely across eras and cultures. Don't default to the same well-known Western figures.

The reader's interest areas:
${interestList}

Where natural, connect the lesson to one of these interest areas. Don't force it.

Write a compelling, concise lesson. This should feel like something from a great biography —
a specific story or decision, not a generic platitude.

Respond in exactly this JSON format, no other text:
{
  "leaderName": "Full name",
  "era": "Brief era/context, e.g. '16th-century Japan' or 'Cold War-era America'",
  "title": "A compelling WSJ-style headline for the lesson",
  "story": "3-4 sentences telling the specific story or decision. Be concrete and vivid.",
  "takeaway": "2 sentences: what to apply today. Specific and actionable.",
  "interestConnection": "1 sentence connecting to a relevant interest area, or null if no natural connection"
}`;

  try {
    const message = await client.messages.create({
      model: config.model,
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const parsed = JSON.parse(text);

    return {
      leaderName: parsed.leaderName,
      era: parsed.era,
      title: parsed.title,
      story: parsed.story,
      takeaway: parsed.takeaway,
      interestConnection: parsed.interestConnection || undefined,
    };
  } catch (e) {
    console.error("Failed to generate leader lesson:", e);
    return null;
  }
}
