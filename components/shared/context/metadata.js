import { createContainer } from "unstated-next";
import { useState } from "react";

function useMetadata(initialState = {}) {
  const [contextMetadata, updateMetadata] = useState(initialState);
  const setContextMetadata = (data) => updateMetadata(data);
  return { contextMetadata, setContextMetadata };
}

const MetadataContext = createContainer(useMetadata);

export default MetadataContext;
