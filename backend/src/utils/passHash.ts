import { createHash } from "node:crypto";

const hashPassword = (password: string, captcha: string) => {
    const data = password + captcha.toUpperCase();
    const hash = createHash("sha256").update(data).digest();
    return Buffer.from(hash).toString("base64");
}

export default hashPassword;