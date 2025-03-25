import { Hono } from "hono";
import { authenticationRoutes } from "./authentication-routes";
import { prismaClient } from "../extras/prisma";
import { jwtsecretKey } from "../../environment";
import jwt from "jsonwebtoken";
import { usersRoutes } from "./users-routes";
import { logger } from "hono/logger";
export const allRoutes = new Hono();

// hono.post("/authentication/sign-up", async (context) => {
//   const { username, password } = await context.req.json();

//   try {
//     const result = await signUpWithUsernameAndpassword({
//       username,
//       password,
//     });

//     return context.json(
//       {
//         data: result,
//       },
//       201
//     );
//   } catch (e) {
//     if (e === SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME) {
//       return context.json(
//         {
//           message: "User name already exists",
//         },
//         409
//       );
//     }

//     if (e === SignUpWithUsernameAndPasswordError.UNKNOWN) {
//       return context.json(
//         {
//           message: "Unknown",
//         },
//         500
//       );
//     }
//   }
// });

// hono.post("/authentication/log-in", async (context) => {
//   try {
//     const { username, password } = await context.req.json();
//     const result = await logInWithUsernameAndPassword({
//       username,
//       password,
//     });

//     return context.json(
//       {
//         data: result,
//       },
//       201
//     );
//   } catch (e) {
//     if (
//       e === LogInWithUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD
//     ) {
//       return context.json(
//         {
//           message: "Incorrect username or password",
//         },
//         401
//       );
//     }
//     return context.json(
//       {
//         message: "Unknown",
//       },
//       500
//     );
//   }
// });

// allRoutes.use(async (context,next)=>{
//   console.log('HTTP METHOD',context.req.method);
//   console.log("URL",context.req.url);
//   console.log("HEADERS",context.req.header);

//   await next();
// })
allRoutes.use(logger());
allRoutes.route("/authentication", authenticationRoutes);

// allRoutes.get("/health", (context) => {
//   return context.json(
//     {
//       message: "all ok",
//     },
//     200
//   );
// });

allRoutes.get(
  "/health",
  // async (context, next) => {
  //   console.log("checking health");
  //   console.log("HTTP MRETHOD", context.req.method);
  //   console.log("URL", context.req.url);

  //   const authorization = context.req.header("Authorization")

  //   if (!authorization) {
  //     return context.json({ message: "Unauthorized" }, 401);
  //   }

  //   next();
  // },
  (context) => {
    console.log("checked health");
    return context.json(
      {
        message: "all ok",
      },
      200
    );
  }
);

allRoutes.route("/users", usersRoutes);
