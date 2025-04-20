import { Hono } from "hono";

const book = new Hono();
book.get("/", (c) => c.text("List Books")); // GET /book
book.post("/", (c) => c.text("Create Book")); // POST /book

export default book;
