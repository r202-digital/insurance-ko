import { createProduct } from "lib/product";

export default async function productCreate(req, res) {
  try {
    const data = await createProduct(req.body);
    res.status(200).json({ createProduct: data });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}
