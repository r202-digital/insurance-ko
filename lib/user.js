// import crypto from 'crypto'
import faunadb from "faunadb";
const secret = process.env.FAUNA_SERVER_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

export async function createUser({ email, password, ...props }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  //
  // const salt = crypto.randomBytes(16).toString('hex')
  // const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  // const user = await DB.createUser({ email, salt, hash })
  try {
    await client.query(
      q.Create(q.Collection("users"), {
        credentials: { password: password },
        data: {
          email: email,
          ...props,
        },
      })
    );

    return { email };
  } catch (e) {
    return e;
  }
}

export async function findUser({ email, password }) {
  // Here you should lookup for the user in your DB and compare the password:
  //
  // const user = await DB.findUser(...)
  // const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
  // const passwordsMatch = user.hash === hash
  try {
    await client.query(
      q.Login(q.Match(q.Index("users_by_email"), email), {
        password: password,
      })
    );

    const { data } = await client.query(
      q.Get(q.Match(q.Index("users_by_email"), email))
    );

    return { ...data };
  } catch (e) {
    throw e;
  }
}