import { createContainer } from "unstated-next";
import { useState } from "react";

function useTerms(initialState = []) {
  const [contextTerms, updateTerms] = useState(initialState);
  const setContextTerms = (data) => updateTerms(data);
  return { contextTerms, setContextTerms };
}

const TermsContext = createContainer(useTerms);

export default TermsContext;
