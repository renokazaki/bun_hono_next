import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import book from "./books";
import user from "./user";
// import { prisma } from "../prisma/prisma";

//👷開発用
// import { serve } from "@hono/node-server";

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
  .route("/book", book) // Handle /book
  .route("/user", user); // Handle /user

// const postTodo = app.post("/todos", async (c) => {
//   try {
//     const body = await c.req.json();

//     const newTodo = await prisma.todo.create({
//       data: {
//         title: body.title,
//         completed: body.completed,
//       },
//     });

//     return c.json(newTodo, 201);
//   } catch (error) {
//     console.error("Error creating todo:", error);
//     return c.json(
//       {
//         error: "Failed to create todo",
//       },
//       500
//     );
//   }
// });

// 👷開発用
// const port = 8085;
// console.log(`Server is running on http://localhost:${port}`);

// serve({
//   fetch: app.fetch,
//   port,
// });

export type AppType = typeof app;

export default handle(app);
