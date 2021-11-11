import { updateUser } from "lib/user";
import { encryptSession } from "lib/iron";
import { setTokenCookie } from "lib/auth-cookies";

export default async function userUpdate(req, res) {
  try {
    const data = await updateUser(req.body);
    const token = await encryptSession(data.data);
    setTokenCookie(res, token);
    res.status(200).json({ updateUser: data });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}
