import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { getPrisma } from "../prisma/prismaFunction";

// //開発用
// import { serve } from "@hono/node-server";

export const config = {
  runtime: "edge",
};

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>().basePath("/api");

app.use(
  "*",
  cors({
    origin: "*",
  })
);

// //開発用
// const port = 8085;
// console.log(`Server is running on http://localhost:${port}`);

// serve({
//   fetch: app.fetch,
//   port,
// });

const route = app.get("/hello", (c) => {
  return c.json({ message: "Hello Hono!" });
});

// app.get("/todos", async (c) => {
//   const gettodos = await prisma.todo.findMany();
//   return c.json(gettodos);
// });

// Todoエンドポイント - 環境変数のアクセス方法を修正
app.get("/todos", async (c) => {
  try {
    // Vercelのエッジ環境で環境変数にアクセスする方法
    const database_url =
      process.env.DATABASE_URL ||
      c.env?.DATABASE_URL ||
      c.req.raw.headers.get("x-vercel-env-DATABASE_URL");

    if (!database_url) {
      return c.json({ error: "DATABASE_URL is not defined" }, 500);
    }

    const prisma = getPrisma(database_url);
    const todos = await prisma.todo.findMany();
    return c.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return c.json(
      {
        error: "Failed to fetch todos",
      },
      500
    );
  }
});

export type AppType = typeof route;

export default handle(app);
