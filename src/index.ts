import "dotenv/config";
import { allRoutes } from "./routes/routes";
import { serve } from "@hono/node-server";

serve(allRoutes);

console.log("server is running on http://localhost:3000/health");
