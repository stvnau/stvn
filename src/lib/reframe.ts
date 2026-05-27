import Anthropic from "@anthropic-ai/sdk";
import { config, InterestArea } from "./config";
import { RawArticle } from "./news";
import { CachedArticle, LeaderLesson } from "./cache";

function getClient(): Anthropic {
  return new Anthropic();
}

export async function reframeArticle(
  raw: RawArticle,
  interest: InterestArea
): Promise<Omit<CachedArticle, "id"> | null> {
  const client = getClient();

  const prompt = `You are reframing a news article for a personal daily newspaper.

Interest area: ${interest.label} — ${interest.description}

Original headline: ${raw.title}
Original description: ${raw.description}
Source: ${raw.source}

${config.reframeTone}

Respond in exactly this JSON format, no other text:
{
  "reframedHeadline": "A WSJ-style headline that captures the story with an opportunity/growth angle",
  "reframedSummary": "2-3 sentences of accurate reporting. Preserve all facts from the original. Write in WSJ prose style — authoritative, concise.",
  "whatThisMeans": "2-3 sentences from a mentor's perspective. How could this development relate to personal growth, skills, or goals? Be specific and actionable, not generic. Never invent facts."
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
      interestId: interest.id,
      originalHeadline: raw.title,
      originalDescription: raw.description,
      sourceUrl: raw.url,
      sourceName: raw.source,
      publishedAt: raw.publishedAt,
      reframedHeadline: parsed.reframedHeadline,
      reframedSummary: parsed.reframedSummary,
      whatThisMeans: parsed.whatThisMeans,
      imageUrl: raw.image,
    };
  } catch (e) {
    console.error("Failed to reframe article:", raw.title, e);
    return null;
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
