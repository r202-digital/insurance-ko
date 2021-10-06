import { createContainer } from "unstated-next";
import { useState } from "react";

function useProducts(initialState = []) {
  const [contextProducts, updateProducts] = useState(initialState);
  const setContextProducts = (data) => updateProducts(data);
  return { contextProducts, setContextProducts };
}

const ProductsContext = createContainer(useProducts);

export default ProductsContext;
