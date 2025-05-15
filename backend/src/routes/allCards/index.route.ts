import axios from "axios";
import { Hono } from "hono";

import { getCache, setCache } from '@/utils/cardCache.js';

const app = new Hono();

app.get("/", async (c) => {
  if (!getCache("cards")) {
    console.log("not cached");
    try {
      const response = await axios.get("https://digimoncard.io/api-public/getAllCards.php?sort=name&series=Digimon%20Card%20Game&sortdirection=asc");
      setCache("cards", response.data);
    }
    catch (err) {
      console.log("Error while getting all cards.");
      console.log(err);
    }
  }

  const render = await JSON.stringify(getCache("cards"));
  return c.text(render);
});

export interface AllCards {
  name: string;
  cardnumber: string;
}

export default app;
