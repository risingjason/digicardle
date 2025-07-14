import { serve } from "@hono/node-server";
import { Hono } from "hono";

import cards from "@/routes/cards/index.route.js";

const port = 9999;

const app = new Hono();
app.route("/cards", cards);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
