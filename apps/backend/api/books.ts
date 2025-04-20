import { Hono } from "hono";

const book = new Hono();
book.get("/book", (c) => c.text("List Books")); // GET /book
book.post("/book", (c) => c.text("Create Book")); // POST /book

export default book;
