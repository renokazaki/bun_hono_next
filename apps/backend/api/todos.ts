import { Hono } from "hono";
import { prisma } from "../prisma/prisma";

const todos = new Hono()
  .get("/todos", async (c) => {
    const gettodos = await prisma.todo.findMany();
    return c.json(gettodos);
  })

  .post("/todos", async (c) => {
    try {
      const body = await c.req.json();

      const newTodo = await prisma.todo.create({
        data: {
          title: body.title,
          completed: body.completed,
        },
      });

      return c.json(newTodo, 201);
    } catch (error) {
      console.error("Error creating todo:", error);
      return c.json(
        {
          error: "Failed to create todo",
        },
        500
      );
    }
  });

export default todos;
