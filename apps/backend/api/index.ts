import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// //開発用
// import { serve } from "@hono/node-server";

export const config = {
  runtime: "edge",
};

// Create the main Hono app
const app = new Hono().basePath("/api");
const prisma = new PrismaClient().$extends(withAccelerate());

app.use(
  "*",
  cors({
    origin: "*",
  })
);

// 開発用
// const port = 8085;
// console.log(`Server is running on http://localhost:${port}`);

// serve({
//   fetch: app.fetch,
//   port,
// });

const route = app.get("/hello", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.get("/todos", async (c) => {
  const gettodos = await prisma.todo.findMany();
  return c.json(gettodos);
});

// // Todoエンドポイント
// app.get("/todos", async (c) => {
//   try {
//     // Prisma Clientを初期化
//     const prisma = new PrismaClient({
//       datasourceUrl: DATABASE_URL,
//     }).$extends(withAccelerate());

//     const todos = await prisma.todo.findMany();
//     return c.json(todos);
//   } catch (error) {
//     console.error("Error fetching todos:", error);
//     return c.json(
//       {
//         error: "Failed to fetch todos",
//       },
//       500
//     );
//   }
// });

export type AppType = typeof route;

export default handle(app);
