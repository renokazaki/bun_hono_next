import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

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

const route = app.get("/hello", (c) => {
  return c.json({ message: "Hello Hono!" });
});

export type AppType = typeof route;

export default handle(app);
