import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { prisma } from "../prisma/prisma";

//👷開発用
//import { serve } from "@hono/node-server";

export const config = {
  runtime: "edge",
};

// Create the main Hono app
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

  .get("/todos", async (c) => {
    const gettodos = await prisma.todo.findMany();
    return c.json(gettodos);
  });

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
//const port = 8085;
//console.log(`Server is running on http://localhost:${port}`);

//serve({
//  fetch: app.fetch,
//  port,
//});

export type AppType = typeof app;

export default handle(app);
