import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

//👷開発用
//import { serve } from "@hono/node-server";

export const config = {
  runtime: "edge",
};

//👷開発用データベースURLを直接指定
//const DATABASE_URL =
//"prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZjAzMjcyYzctYzNjYS00NWQzLTg4ZDktNjIwZmU2NTkzNTdjIiwidGVuYW50X2lkIjoiZjA4Y2Y2ZWRkYjY3OGQ5ZTgzYThiZGY5MmMyNzdjNzdmM2FkZTBjOGIwOTI0MGJiYTVmOGQ4YWY3ZjYwNmExZSIsImludGVybmFsX3NlY3JldCI6ImNiYzg1NzNmLTNjNWQtNDc1Zi05YzY0LWIzMjVkZGYwNjgwNSJ9.tOT0f2SLpM9edC4e3_mAUEE9JbK62_j8wS96aRotwp8";

//🔥本番用
const DATABASE_URL = process.env.DATABASE_URL;

// Create the main Hono app
const app = new Hono().basePath("/api");
const prisma = new PrismaClient({
  datasourceUrl: DATABASE_URL,
}).$extends(withAccelerate());

app.use(
  "*",
  cors({
    origin: "*",
  })
);

// 👷開発用
//const port = 8085;
//console.log(`Server is running on http://localhost:${port}`);

//serve({
//  fetch: app.fetch,
//  port,
//});

const hello = app.get("/hello", (c) => {
  return c.json({ message: "Hello Hono!" });
});

const getTodo = app.get("/todos", async (c) => {
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

export type AppType = typeof hello & typeof getTodo;

export default handle(app);
