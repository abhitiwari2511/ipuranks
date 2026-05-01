import { wrapper } from "axios-cookiejar-support";
import asyncHandler from "../utils/asyncHandler.js";
import hashPassword from "../utils/passHash.js";
import { deleteSession, getSession } from "../utils/sessionStore.js";
import axios from "axios";

const baseUrl = process.env.BASE_URL;

// new api so that response subject[] ke form me jaaye
interface NewApiResponse {
  report: string;
  stprofile: {
    nrollno: string;
    stname: string;
    byoa: number;
    yoa: number;
    prgcode: string;
    prgname: string;
    icode: string;
    iname: string;
  };
  header: string[];
  stresult: (string | number)[][];
}

const transformApiResponse = (apiData: NewApiResponse) => {
  const { stprofile, stresult } = apiData;

  return stresult.map((row) => {
    // exam month and year ko alag karke parse karna
    const examParts = String(row[7]).split(",");
    const rmonth = parseInt(examParts[0] ?? "0") || 0;
    const ryear = parseInt(examParts[1] ?? "0") || 0;

    return {
      nrollno: stprofile.nrollno,
      stname: stprofile.stname,
      byoa: stprofile.byoa,
      yoa: stprofile.yoa,
      prgcode: stprofile.prgcode,
      prgname: stprofile.prgname,
      icode: stprofile.icode,
      iname: stprofile.iname,
      euno: Number(row[0]),
      papercode: String(row[1]),
      papername: String(row[2]),
      minorprint: String(row[3]),
      majorprint: String(row[4]),
      moderatedprint: String(row[5]),
      statuscode: String(row[6]),
      rmonth,
      ryear,
      declareddate: String(row[8]),
      eugpa: 0,
      credits: 0, //frontend pe dekhna hai ye
    };
  });
};

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
    }),
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
  form.append("captcha", captcha);

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

  const transformedResult = transformApiResponse(result.data);

  res.status(200).json({
    success: true,
    result: transformedResult,
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  const sessionId = req.headers["x-session-id"] as string;
  const session = getSession(sessionId);
  if (session) {
    const client = wrapper(
      axios.create({
        jar: session.jar,
        withCredentials: true,
      }),
    );
  }

  deleteSession(sessionId);
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

export { logoutUser, loginUser };
