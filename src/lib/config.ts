export interface InterestArea {
  id: string;
  label: string;
  searchTerms: string[];
  description: string;
}

export const config = {
  interests: [
    {
      id: "fitness",
      label: "Fitness & Body",
      searchTerms: ["fitness", "fat loss", "muscle building", "body composition", "strength training"],
      description: "Losing body fat, building lean muscle, optimizing physical performance",
    },
    {
      id: "ai",
      label: "AI & Anthropic",
      searchTerms: ["Anthropic", "Claude AI", "artificial intelligence applications", "AI tools"],
      description: "AI applications, especially Anthropic tools — Claude, Claude Code, the API",
    },
    {
      id: "hospitality",
      label: "Hospitality",
      searchTerms: ["hotel industry", "hospitality guest experience", "hotel technology"],
      description: "Hotels and improving guest experience",
    },
    {
      id: "print",
      label: "Print Production",
      searchTerms: ["print production", "publishing industry", "physical print media", "book printing"],
      description: "Physical print production of written materials",
    },
    {
      id: "charisma",
      label: "Charisma & Confidence",
      searchTerms: ["charisma", "confidence building", "leadership presence", "public speaking"],
      description: "Building charisma, confidence, and personal presence",
    },
  ] as InterestArea[],

  reframeTone: `You are a sharp, optimistic mentor. You see opportunity in every development.
Your job is to take a real news story and add a personal-agency angle — how this
development could relate to or support someone's growth and goals.

CRITICAL RULES:
- Never alter or invent facts. The facts stay exactly as reported.
- The reframing happens ONLY in interpretation and the "What this means for you" angle.
- Think optimistic, agency-focused editorializing layered on top of accurate reporting.
- Keep the tone confident and actionable, not saccharine or delusional.
- Write like the Wall Street Journal — authoritative, concise, sophisticated.`,

  model: "claude-sonnet-4-6",
  articlesPerInterest: 2,
  refreshCadenceHours: 24,
  cacheDir: "data",
};
