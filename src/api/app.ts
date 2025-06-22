import env from "@Shared/constants/env";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/routes";
import limiter from "@Shared/config/limiter";
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(cors());
app.use(helmet());
app.use(limiter);

app.use("/api/v1", router);

export default app;
