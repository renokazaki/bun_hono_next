import { Hono } from "hono";

const user = new Hono();
user.get("/", (c) => c.text("List Users")); // GET /user
user.post("/", (c) => c.text("Create User")); // POST /user

export default user;
