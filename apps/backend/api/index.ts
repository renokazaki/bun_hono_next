import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import testaa from "./routes/todos/testaa";
import user from "./routes/users/users";
import book from "./routes/books/books";
import line from "./routes/line/index";

//👷開発用
// import { serve } from "@hono/node-server";

//検証

export const config = {
  runtime: "edge",
};

const app = new Hono()
  .basePath("/api")
  .use(
    "*",
    cors({
      origin: "*",
    })
  )

  .get("/hello", (c) => {
    return c.json({ message: "Hello Hono!" });
  })
  .route("/testaa", testaa)
  .route("/user", user) // Handle /user
  .route("/book", book) // Handle /book
  .route("/line", line)

// 👷開発用
// const port = 8085;
// console.log(`Server is running on http://localhost:${port}`);

// serve({
//   fetch: app.fetch,
//   port,
// });

export type AppType = typeof app;
export default handle(app);
