"use server";

import { generateDailyEdition } from "@/lib/pipeline";

export async function refreshEdition(): Promise<{
  success: boolean;
  error?: string;
  articleCount?: number;
}> {
  try {
    const edition = await generateDailyEdition();
    return { success: true, articleCount: edition.articles.length };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
