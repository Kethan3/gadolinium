import { createMiddleware } from "hono/factory";
import { jwtsecretKey } from "../../../environment";
import jwt from "jsonwebtoken" ;

export const tokenMiddleware = createMiddleware(async (context, next) => {
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
  },)