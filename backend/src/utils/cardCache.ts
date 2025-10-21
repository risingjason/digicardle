import type { AllCards } from "@/routes/cards/index.route.js";

const cardCache = new Map<string, { data: [AllCards]; expires: number }>();
const oneHourMs = 3600000;

export function getCache(key: string) {
  const entry = cardCache.get(key);

  // returns null if no entry or entry expired
  if (!entry || entry.expires < Date.now()) {
    return null;
  }

  return entry.data;
}

export function setCache(key: string, data: [AllCards], ttl: number) {
  cardCache.set(key, { data, expires: Date.now() + ttl * oneHourMs });
}
