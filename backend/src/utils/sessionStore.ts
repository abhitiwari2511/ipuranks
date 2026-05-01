import { CookieJar } from "tough-cookie";

interface SessionData {
  jar: CookieJar;
  createdAt: number;
  lastAccessedAt: number;
  sessionId?: string;
}

const sessionStore = new Map<string, SessionData>();
const SESSION_TTL_MS = 45 * 60 * 1000;
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;

const cleanupExpiredSessions = () => {
  const now = Date.now();

  for (const [sessionId, session] of sessionStore) {
    if (now - session.lastAccessedAt > SESSION_TTL_MS) {
      sessionStore.delete(sessionId);
    }
  }
};

const cleanupTimer = setInterval(cleanupExpiredSessions, CLEANUP_INTERVAL_MS);
cleanupTimer.unref?.();

const createSession = () => {
  const sessionId = crypto.randomUUID();
  
  if (!sessionId) {
    throw new Error("Failed to generate session ID");
  }

  const jar = new CookieJar();

  sessionStore.set(sessionId, {
    jar,
    createdAt: Date.now(),
    lastAccessedAt: Date.now(),
  });

  return sessionId;
}

const getSession = (sessionId: string) => {
  const session = sessionStore.get(sessionId);
  if (session) {
    session.lastAccessedAt = Date.now();
  }
  return session;
}

 const deleteSession = (sessionId: string) => {
  sessionStore.delete(sessionId);
}

export { createSession, getSession, deleteSession };