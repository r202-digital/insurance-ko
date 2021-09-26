import { deleteProduct } from "lib/product";

export default async function productCreate(req, res) {
  try {
    const data = await deleteProduct(req.body);
    res.status(200).json({ deleteProduct: data });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}
