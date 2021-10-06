import { createUser } from "lib/user";
import { setTokenCookie } from "lib/auth-cookies";
import { encryptSession } from "lib/iron";

export default async function signup(req, res) {
  try {
    const userCreate = await createUser(req.body);
    const token = await encryptSession(userCreate);
    setTokenCookie(res, token);

    res.status(200).send({ done: true, user: userCreate });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
