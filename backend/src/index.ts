import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

const port = 3000;

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
