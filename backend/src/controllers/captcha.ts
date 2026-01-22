import { CookieJar } from "tough-cookie";
import asyncHandler from "../utils/asyncHandler.js";
import { wrapper } from "axios-cookiejar-support";
import axios from "axios";
import {
  createSession,
  deleteSession,
  getSession,
} from "../utils/sessionStore.js";

const loginPage = process.env.LOGIN_PAGE;
const captchaUrl = process.env.CAPTCHA_URL;

if (!loginPage || !captchaUrl) {
  throw new Error("LOGIN_PAGE and CAPTCHA_URL must be defined");
}

const captcha = asyncHandler(async (req, res) => {
  let sessionId = req.headers["x-session-id"] as string;

  sessionId = createSession();
  const session = getSession(sessionId);

  if (!session) {
    throw new Error("Failed to create session");
  }
  const { jar } = session;

  const client = wrapper(
    axios.create({
      jar,
      withCredentials: true,
    }),
  );
  await client.get(loginPage);

  //captcha image
  const captchaRespose = await client.get(captchaUrl, {
    responseType: "arraybuffer",
    headers: {
      Referer: loginPage,
    },
  });

  res.set("X-Session-Id", sessionId);
  res.set("Content-Type", "image/jpeg");
  res.send(captchaRespose.data);
});

export default captcha;
