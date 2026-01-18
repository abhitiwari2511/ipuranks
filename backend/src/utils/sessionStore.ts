import { CookieJar } from "tough-cookie";

interface SessionData {
    jar: CookieJar;
    createdAt: number;
    sessionId?: string;
}

const sessionStore = new Map<string, SessionData>();

const createSession = () => {
  const sessionId = crypto.randomUUID();
  
  if (!sessionId) {
    throw new Error("Failed to generate session ID");
  }

  const jar = new CookieJar();

  sessionStore.set(sessionId, {
    jar,
    createdAt: Date.now(),
  });

  return sessionId;
}

const getSession = (sessionId: string) => {
  return sessionStore.get(sessionId);
}

 const deleteSession = (sessionId: string) => {
  sessionStore.delete(sessionId);
}

export { createSession, getSession, deleteSession };