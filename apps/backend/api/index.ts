import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
//開発用
import { serve } from "@hono/node-server";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

app.use(
  "*",
  cors({
    origin: "*",
  })
);

//開発用
const port = 8085;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

const route = app.get("/hello", (c) => {
  return c.json({ message: "Hello Hono!" });
});

export type AppType = typeof route;

export default handle(app);
