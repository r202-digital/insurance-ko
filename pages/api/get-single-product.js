import { getProduct } from "lib/product";

export default async function singleProductGet(req, res) {
  try {
    const { body } = req;
    const { id } = body;
    const data = await getProduct(id);
    res.status(200).json({ products: data });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}
