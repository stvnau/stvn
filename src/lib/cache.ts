import path from "path";
import fs from "fs/promises";
import { config } from "./config";

export interface CachedArticle {
  id: string;
  interestId: string;
  originalHeadline: string;
  originalDescription: string;
  sourceUrl: string;
  sourceName: string;
  publishedAt: string;
  reframedHeadline: string;
  reframedSummary: string;
  whatThisMeans: string;
  imageUrl?: string;
}

export interface LeaderLesson {
  leaderName: string;
  era: string;
  title: string;
  story: string;
  takeaway: string;
  interestConnection?: string;
}

export interface DailyEdition {
  date: string;
  generatedAt: string;
  articles: CachedArticle[];
  leaderLesson: LeaderLesson;
}

function getCacheDir(): string {
  return path.join(process.cwd(), "data");
}

function getCachePath(date: string): string {
  return path.join(getCacheDir(), `edition-${date}.json`);
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function readEdition(date?: string): Promise<DailyEdition | null> {
  const key = date ?? todayKey();
  const filePath = getCachePath(key);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as DailyEdition;
  } catch {
    return null;
  }
}

export async function writeEdition(edition: DailyEdition): Promise<void> {
  const dir = getCacheDir();
  await fs.mkdir(dir, { recursive: true });
  const filePath = getCachePath(edition.date);
  await fs.writeFile(filePath, JSON.stringify(edition, null, 2), "utf-8");
}

export async function isStale(date?: string): Promise<boolean> {
  const edition = await readEdition(date);
  if (!edition) return true;

  const generated = new Date(edition.generatedAt).getTime();
  const now = Date.now();
  const hours = (now - generated) / (1000 * 60 * 60);
  return hours >= config.refreshCadenceHours;
}
