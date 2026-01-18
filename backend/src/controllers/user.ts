import { wrapper } from "axios-cookiejar-support";
import asyncHandler from "../utils/asyncHandler.js";
import hashPassword from "../utils/passHash.js";
import { deleteSession, getSession } from "../utils/sessionStore.js";
import axios from "axios";

const baseUrl = process.env.BASE_URL;

const loginUser = asyncHandler(async (req, res) => {
  const sessionId = req.headers["x-session-id"] as string;
  const session = getSession(sessionId);

  if (!session) {
    return res.status(400).json({ error: "Captcha expired. Refresh captcha." });
  }

  const client = wrapper(
    axios.create({
      jar: session.jar,
      withCredentials: true,
    })
  );

  const { rollNo, password, captcha } = req.body;

  if (!rollNo || !password || !captcha) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // login
  await client.get(`${baseUrl}/login.jsp`);

  // hash kro pass ko
  const hashedPassword = hashPassword(password, captcha);

  const form = new URLSearchParams();
  form.append("username", rollNo);
  form.append("passwd", hashedPassword);
  form.append("captcha", captcha.toUpperCase());

  // post data login krne ke liye
  const respone = await client.post(`${baseUrl}/Login`, form.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Referer: `${baseUrl}/login.jsp`,
    },
    maxRedirects: 0,
    validateStatus: (s) => s === 302 || s === 200,
  });

  if (respone.status !== 302) {
    return res.status(401).json({ message: "Login Failed" });
  }

  //student data
  const data = await client.get(`${baseUrl}/student/studenthome.jsp`);

  const result = await client.get(
    `${baseUrl}/StudentSearchProcess?flag=2&euno=100`,
    {
      headers: {
        Referer: `${baseUrl}/student/studenthome.jsp`,
      },
    },
  );

  deleteSession(sessionId);

  res.status(200).json({
    success: true,
    result: result.data,
  });
});

export default loginUser;