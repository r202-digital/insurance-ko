import { encryptSession } from "lib/iron";
import { setTokenCookie } from "lib/auth-cookies";

export default async function cartAdd(req, res) {
  try {
    const data = req.body;
    const token = await encryptSession(data);
    setTokenCookie(res, token);
    res.status(200).json({ cartAdd: data });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}
