import axios from "axios";
import { Hono } from "hono";

const app = new Hono();

app.get("/allcards", async (c) => {
  try {
    const response = await axios.get("https://digimoncard.io/api-public/getAllCards.php?sort=name&series=Digimon%20Card%20Game&sortdirection=asc");
    console.log(response);
  }
  catch (err) {
    console.log("Error while getting all cards.");
    console.log(err);
  }
});

export default app;
