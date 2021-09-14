import { createContainer } from "unstated-next";
import { useState } from "react";

function useOptions(initialState = []) {
  const [contextOptions, updateOptions] = useState(initialState);
  const setContextOptions = (data) => updateOptions(data);
  return { contextOptions, setContextOptions };
}

const OptionsContext = createContainer(useOptions);

export default OptionsContext;
