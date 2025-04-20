import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

//👷開発用
// import { serve } from "@hono/node-server";
import testaa from "./routes/testaa";
import user from "./routes/users";
import book from "./routes/books";

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
  .route("/book", book); // Handle /book

// 👷開発用
// const port = 8085;
// console.log(`Server is running on http://localhost:${port}`);

// serve({
//   fetch: app.fetch,
//   port,
// });

export type AppType = typeof app;
export default handle(app);
