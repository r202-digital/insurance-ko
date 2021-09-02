import { createContainer } from "unstated-next";
import { useState } from "react";

function useVariant(initialState = 0) {
  const [contextVariant, updateVariant] = useState(initialState);
  const setContextVariant = (data) => updateVariant(data);
  return { contextVariant, setContextVariant };
}

const VariantContext = createContainer(useVariant);

export default VariantContext;
