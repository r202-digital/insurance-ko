import passport from "passport";
import nextConnect from "next-connect";
import { localStrategy } from "lib/password-local";
import { encryptSession } from "lib/iron";
import { setTokenCookie } from "lib/auth-cookies";

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate("local", req, res);
      const session = { ...user };
      const token = await encryptSession(session);

      setTokenCookie(res, token);
      res.status(200).send({ done: true, user });
    } catch (error) {
      const { description } = error;
      if (description && description.includes("password")) {
        res.status(401).send("Incorrect email or password");
        return;
      }
      res.status(401).send(error.message);
    }
  });
