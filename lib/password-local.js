import Local from "passport-local";
import { findUser } from "./user";

export const localStrategy = new Local.Strategy(function (
  email,
  password,
  done
) {
  findUser({ email, password })
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
});
