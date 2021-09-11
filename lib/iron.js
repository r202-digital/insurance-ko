import Iron from "@hapi/iron";
import { getTokenCookie } from "lib/auth-cookies";
const secret = process.env.IRON_SECRET;

const TOKEN_SECRET = secret;

export function encryptSession(session) {
  return Iron.seal(session, TOKEN_SECRET, Iron.defaults);
}

export async function getSession(req) {
  const token = getTokenCookie(req);
  return token && Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
}
