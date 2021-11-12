import { updateUser } from "lib/user";
import { encryptSession } from "lib/iron";
import { setTokenCookie } from "lib/auth-cookies";

export default async function cartAdd(req, res) {
  try {
    console.log("CART: ", req.body);
    // const token = await encryptSession(req.body);
    // setTokenCookie(res, token);
    res.status(200).json({ cartAdd: data });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}
