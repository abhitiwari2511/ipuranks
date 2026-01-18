import { Router } from "express";

const userRouter = Router();

userRouter.route("/").post(captchaMiddleware, createUserHandler);

export default userRouter;