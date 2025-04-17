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

app.get("/todos", async (c) => {
  // Now you can use it wherever you want
  const prisma = getPrisma(
    "postgresql://postgres.wxxwfsigadikodfkclcv:okazakiren19990821@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
  );
  const gettodos = await prisma.todo.findMany();
  return c.json(gettodos);
});

export type AppType = typeof route;

export default handle(app);
