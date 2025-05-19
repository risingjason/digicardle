import axios from "axios";
import * as cheerio from "cheerio";
import { Hono } from "hono";

import { getCache, setCache } from "@/utils/cardCache.js";

const DIGIMON_CARD_IO = "https://digimoncard.io/api-public";
const DIGIMON_CARD_IO_ALL_CARDS_ROUTE = "/getAllCards.php?sort=name&series=Digimon%20Card%20Game&sortdirection=asc";
const DIGIMON_CARD_IO_SEARCH_CARD_ROUTE = "/search.php";
const DIGIMON_WIKI_ROUTE = "https://digimoncardgame.fandom.com/wiki";
const DIGIMON_WIKI_GALLERY = "/Gallery";

const app = new Hono();

app.get("/", async (c) => {
  if (!getCache("cards")) {
    try {
      const response = await axios.get(DIGIMON_CARD_IO + DIGIMON_CARD_IO_ALL_CARDS_ROUTE);
      setCache("cards", response.data, 1);
    }
    catch (err) {
      console.log("Error while getting all cards.");
      console.log(err);
    }
  }

  const render = await JSON.stringify(getCache("cards"));
  return c.text(render);
});

app.get("/:card", async (c) => {
  const card = c.req.param("card");
  try {
    const { data } = await axios.get(`${DIGIMON_CARD_IO}${DIGIMON_CARD_IO_SEARCH_CARD_ROUTE}?card=${card}`);

    const cardData = await JSON.stringify(data);
    return c.text(cardData);
  }
  catch (err) {
    console.log(err);
  }
});

app.get("/:card/image", async (c) => {
  const card = c.req.param("card");
  try {
    const $ = await cheerio.fromURL(`${DIGIMON_WIKI_ROUTE}/${card}${DIGIMON_WIKI_GALLERY}`);
    const cardsSelector = $("div#gallery-0 img[data-image-name]");
    let cardVariations = [];
    for (let i = 0; i < cardsSelector.length; i++) {
      const card = cardsSelector[i].attribs["data-src"].split("png")[0] + "png";

      // removes samples because they are usually dupes
      if (!card.toLowerCase().includes("sample")) {
        cardVariations.push(card);
      }
    }
    return c.text("" + cardVariations);
  }
  catch (err) {
    console.log(err);
  }
});

export interface AllCards {
  name: string;
  cardnumber: string;
}

export default app;
