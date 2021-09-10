import Iron from "@hapi/iron";
const secret = process.env.IRON_SECRET;

const TOKEN_SECRET = secret;

export function encryptSession(session) {
  return Iron.seal(session, TOKEN_SECRET, Iron.defaults);
}

export async function getSession(token) {
  return token && Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
}
