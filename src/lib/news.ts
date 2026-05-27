export interface RawArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  image?: string;
}

interface NewsProvider {
  fetchByTopic(query: string, maxResults: number): Promise<RawArticle[]>;
}

class GNewsProvider implements NewsProvider {
  private apiKey: string;
  private baseUrl = "https://gnews.io/api/v4";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchByTopic(query: string, maxResults: number): Promise<RawArticle[]> {
    const params = new URLSearchParams({
      q: query,
      lang: "en",
      max: String(maxResults),
      apikey: this.apiKey,
      sortby: "publishedAt",
    });

    const res = await fetch(`${this.baseUrl}/search?${params}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`GNews API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    if (!data.articles || !Array.isArray(data.articles)) return [];

    return data.articles.map((a: Record<string, unknown>) => ({
      title: a.title as string,
      description: a.description as string,
      url: a.url as string,
      source: (a.source as Record<string, string>)?.name ?? "Unknown",
      publishedAt: a.publishedAt as string,
      image: (a.image as string) || undefined,
    }));
  }
}

let provider: NewsProvider | null = null;

function getProvider(): NewsProvider {
  if (provider) return provider;

  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    throw new Error("GNEWS_API_KEY environment variable is not set");
  }

  provider = new GNewsProvider(apiKey);
  return provider;
}

export async function fetchNewsForTopic(
  searchTerms: string[],
  maxResults: number
): Promise<RawArticle[]> {
  const newsProvider = getProvider();
  const query = searchTerms.slice(0, 3).join(" OR ");
  return newsProvider.fetchByTopic(query, maxResults);
}
