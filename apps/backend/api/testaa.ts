import { Hono } from "hono";
import { prisma } from "../prisma/prisma";

const testaa = new Hono().get("/todos", async (c) => {
  const gettodos = await prisma.todo.findMany();
  return c.json(gettodos);
});

export default testaa;
