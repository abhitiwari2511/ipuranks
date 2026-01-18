import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: ErrorRequestHandler | any) {
      return res
        .status(error.code || 500)
        .json({ message: "Internal Server Error", error, success: "false" });
    }
  };
};

export default asyncHandler;
