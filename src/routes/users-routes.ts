import { Hono } from "hono";
import { prismaClient } from "../extras/prisma";
import { tokenMiddleware } from "./middlewares/token-middleware";

export const usersRoutes = new Hono();

usersRoutes.get(
  "",
  tokenMiddleware,
  async (context) => {
    const users = await prismaClient.user.findMany();

    return context.json(users, 200);
  }
);
