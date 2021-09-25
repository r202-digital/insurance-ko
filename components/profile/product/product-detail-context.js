import { createContainer } from "unstated-next";
import { useState } from "react";

function useProductDetail(initialState = {}) {
  const [contextProductDetail, updateProductDetail] = useState(initialState);
  const setContextProductDetail = (data) => updateProductDetail(data);
  return { contextProductDetail, setContextProductDetail };
}

const ProductDetailContext = createContainer(useProductDetail);

export default ProductDetailContext;
