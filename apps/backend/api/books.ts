// // books.ts
// import { Hono } from "hono";
// import { cors } from "hono/cors";
// import { handle } from "hono/vercel";

// export const config = {
//   runtime: "edge",
// };
// const books = new Hono()
//   .basePath("/books")
//   .use(
//     "*",
//     cors({
//       origin: "*",
//     })
//   )
//   .get("/", (c) => c.json("list books"))
//   .post("/", (c) => c.json("create a book", 201))
//   .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

// export type AppType = typeof books;

// export default handle(books);
