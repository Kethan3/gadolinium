import { Hono } from "hono";
import { prismaClient } from "../extras/prisma";
import { tokenMiddleware } from "./middlewares/token-middleware";
import { getAllUsers, getMe } from "../controllers/users/users-controller";
import { GetMeError } from "../controllers/users/users-types";

export const usersRoutes = new Hono();

usersRoutes.get("/me", tokenMiddleware, async (context) => {
  const userId = context.get("userId");
  try {
    const user = await getMe({
      userId,
    });

    return context.json(
      {
        data: user,
      },
      200
    );
  } catch (e) {
    if (e === GetMeError.BAD_REQUEST) {
      return context.json(
        {
          error: "User not found",
        },
        400
      );
    }

    return context.json(
      {
        message: "Internal Server Error",
      },
      500
    );
  }
});

usersRoutes.get("", tokenMiddleware, async (context) => {
  try {
    const users = await getAllUsers();

    context.json(
      {
        data: users,
      },
      200
    );
  } catch (e) {
    context.json({
      message: "Internal Server Error",
    });
  }
});
