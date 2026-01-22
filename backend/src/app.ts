import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    exposedHeaders: ["x-session-id"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRouter from "./routes/user.js";
import captchaRouter from "./routes/captcha.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/captcha", captchaRouter);

export default app;
