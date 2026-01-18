import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRouter from "./routes/user.js"

app.use("/api/v1/user", userRouter);

export default app;