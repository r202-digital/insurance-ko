import { createContainer } from "unstated-next";
import { useState } from "react";

function useProduct(initialState = []) {
  const [contextProduct, updateProduct] = useState(initialState);
  const setContextProduct = (data) => updateProduct(data);
  return { contextProduct, setContextProduct };
}

const ProductContext = createContainer(useProduct);

export default ProductContext;
