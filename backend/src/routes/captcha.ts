import { Router } from "express";
import captcha from "../controllers/captcha.js";

const captchaRouter = Router();

captchaRouter.route("/generate").get(captcha);

export default captchaRouter;