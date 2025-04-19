// index.ts
import { Hono } from "hono";
import authors from "./author";
import books from "./books";
import todos from "./todos";

import { cors } from "hono/cors";
import { handle } from "hono/vercel";

//👷開発用
// import { serve } from "@hono/node-server";

export const config = {
  runtime: "edge",
};

const app = new Hono();
// const port = 8085;
// console.log(`Server is running on http://localhost:${port}`);

// serve({
//   fetch: app.fetch,
//   port,
// });

// 😃
const routes = app
  .use(
    "*",
    cors({
      origin: "*",
    })
  )
  .route("/authors", authors)
  .route("/books", books)
  .route("/todos", todos);

export default handle(app);
export type AppType = typeof routes;
