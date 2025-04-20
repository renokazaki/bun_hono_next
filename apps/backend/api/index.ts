import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import todos from "./todos";

import user from "./users";
import book from "./books";

//👷開発用
//import { serve } from "@hono/node-server";

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

  .route("/todos", todos) // Handle /user
  .route("/user", user) // Handle /user
  .route("/book", book); // Handle /book

// 👷開発用
//const port = 8085;
//console.log(`Server is running on http://localhost:${port}`);

//serve({
//  fetch: app.fetch,
//  port,
//});

export type AppType = typeof app;
export type TodosType = typeof todos;

export default handle(app);
