import faunadb from "faunadb";
const secret = process.env.FAUNA_SERVER_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);

export async function createProduct(props) {
  // TODO: add nanoid to product
  try {
    await client.query(
      q.Create(q.Collection("products"), {
        data: {
          ...props,
        },
      })
    );

    return { ...props };
  } catch (e) {
    return e;
  }
}

export async function getProduct(id) {
  try {
    const { data = {} } = await client.query(
      q.Get(q.Match(q.Index("product_by_id"), id))
    );

    return data;
  } catch (e) {
    return {
      error: e.message,
    };
  }
}

export async function getProducts() {
  try {
    // const data = await client.query(q.Get(q.Collection("products")));
    // const data = await client.query(
    //   q.Paginate(q.Documents(q.Collection("products"))),
    //   q.Lambda((x) => q.Get(x))
    // );

    const count = await client.query(
      q.Count(q.Documents(q.Collection("products")))
    );

    const { data = [] } = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_products")), {
          size: count,
        }),
        q.Lambda((x) => q.Get(x))
      )
    );

    return data.map((obj) => obj.data);
  } catch (e) {
    return e;
  }
}
