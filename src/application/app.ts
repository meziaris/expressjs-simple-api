import express from "express";
import { ErrorMiddleware } from "../middleware/error.middleware.js";
import v1 from "../route/v1/index.js";

export const app = express();

app.use(express.json());
app.use("/api/v1", v1);
app.use(ErrorMiddleware);
