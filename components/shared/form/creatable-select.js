import React from "react";
import CreatableSelect from "react-select/creatable";

const colourStyles = {
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "rgba(37, 157, 1, 0.2) !important",
    };
  },
  multiValueLabel: (styles) => {
    return {
      ...styles,
      backgroundColor: "transparent !important",
    };
  },
  multiValueRemove: (styles) => {
    return {
      ...styles,
      backgroundColor: "transparent !important",
    };
  },
};
const CreateSelect = (props) => {
  return (
    <CreatableSelect
      {...props}
      isClearable
      isMulti
      styles={colourStyles}
      options={[
        { value: "For Myself", label: "For Myself" },
        { value: "For Me & My Family", label: "For Me & My Family" },
        { value: "Loan-based", label: "Loan-based" },
        { value: "Group", label: "Group" },
        { value: "Business", label: "Business" },
        { value: "Customized", label: "Customized" },
      ]}
    />
  );
};

export default CreateSelect;
