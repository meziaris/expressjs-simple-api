import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response.error.js";

export const ErrorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: `validation error: ${err.message}` });
  }

  if (err instanceof ResponseError) {
    return res.status(err.code).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
};
