import { getProducts } from "lib/product";

export default async function productGet(req, res) {
  try {
    const data = await getProducts();
    res.status(200).json({ products: data });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}
