import { Router } from "express";
import {loginUser, logoutUser } from "../controllers/user.js";

const userRouter = Router();

userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);

export default userRouter;