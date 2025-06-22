import env from "@Shared/constants/env";
import app from "./app";
import { mongoConnection } from "@Shared/config/mongoose";

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception.. Shutting down...", err);
  process.exit(1);
});

const server = app.listen(env.PORT, async () => {
  await mongoConnection();
  console.log("Server started successfully at PORT: ", env.PORT);
});

process.on("unhandledRejection", (reason: any) => {
  console.error("Unhandled Rejection", reason);
  server.close(() => {
    process.exit(1);
  });
});
