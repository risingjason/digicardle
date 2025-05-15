import type { AllCards } from "@/routes/allCards/index.route.js";

const cardCache = new Map<string, { data: [AllCards]; expires: number }>();

export const getCache = (key: string) => {
  const entry = cardCache.get(key);

  // returns null if no entry or entry expired
  if (!entry || entry.expires < Date.now()) {
    return null;
  }

  return entry.data;
}

export const setCache = (key: string, data: [AllCards], ttl: number = 300000) => {
  cardCache.set(key, { data, expires: Date.now() + ttl});
};
