import { Hono } from "hono";
import { prismaclient } from "../extras/prisma";
import { jwtsecretKey } from "../../environment";
import jwt from "jsonwebtoken";


export const  usersRoutes = new Hono();

usersRoutes.get(
    "",
    async (context, next) => {
      const token = context.req.header("token");
      if (!token) {
        return context.json(
          {
            message: "missing Token",
          },
          401
        );
      }
  
      try {
        const verified = jwt.verify(token, jwtsecretKey);
        await next();
      } catch (e) {
        return context.json({ message: "Unauthorized or missing token" }, 401);
      }
    },
    async (context) => {
      const users = await prismaclient.user.findMany();
  
      return context.json(users, 200);
    }
  );