// authors.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
// import { handle } from "hono/vercel";

export const config = {
  runtime: "edge",
};
const app = new Hono()
  .use(
    "*",
    cors({
      origin: "*",
    })
  )
  .get("/", (c) => c.json("list authors"))
  .post("/", (c) => c.json("create an author", 201))
  .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default app;
