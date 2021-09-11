import { createUser } from "lib/user";
import { setTokenCookie } from "lib/auth-cookies";
import { encryptSession } from "lib/iron";

export default async function signup(req, res) {
  try {
    await createUser(req.body);
    const userInfo = req.body && {
      email: req.body.email || "",
      name: req.body.name || "",
    };
    const token = await encryptSession(userInfo);
    setTokenCookie(res, token);

    res.status(200).send({ done: true, user: userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
