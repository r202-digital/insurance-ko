import { createContainer } from "unstated-next";
import { useState } from "react";

function usePromo(initialState = []) {
  const [contextPromo, updatePromo] = useState(initialState);
  const setContextPromo = (data) => updatePromo(data);
  return { contextPromo, setContextPromo };
}

const PromoContext = createContainer(usePromo);

export default PromoContext;
