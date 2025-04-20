import { Hono } from "hono";
import { prisma } from "../prisma/prisma";

export const config = {
  runtime: "edge",
};
const testaa = new Hono();

testaa.get("/", async (c) => {
  const gettodos = await prisma.todo.findMany();
  return c.json(gettodos);
});

export default testaa;
