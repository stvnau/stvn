import { NextRequest } from "next/server";
import { generateDailyEdition } from "@/lib/pipeline";
import { readEdition, todayKey } from "@/lib/cache";

export async function POST(request: NextRequest) {
  const secret = process.env.REFRESH_SECRET;
  if (secret) {
    const authHeader = request.headers.get("authorization");
    const providedSecret =
      authHeader?.replace("Bearer ", "") ??
      request.nextUrl.searchParams.get("secret");
    if (providedSecret !== secret) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const edition = await generateDailyEdition();
    return Response.json({
      success: true,
      date: edition.date,
      articleCount: edition.articles.length,
      generatedAt: edition.generatedAt,
    });
  } catch (e) {
    console.error("Refresh failed:", e);
    return Response.json(
      { error: "Failed to generate edition", details: String(e) },
      { status: 500 }
    );
  }
}

export async function GET() {
  const edition = await readEdition(todayKey());
  if (!edition) {
    return Response.json({ cached: false, date: todayKey() });
  }
  return Response.json({
    cached: true,
    date: edition.date,
    articleCount: edition.articles.length,
    generatedAt: edition.generatedAt,
  });
}
