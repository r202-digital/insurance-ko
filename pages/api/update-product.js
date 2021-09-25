import { updateProduct } from "lib/product";

export default async function productCreate(req, res) {
  try {
    const data = await updateProduct(req.body);
    res.status(200).json({ updateProduct: data });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}
