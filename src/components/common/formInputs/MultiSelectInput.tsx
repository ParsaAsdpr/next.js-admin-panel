import { Box } from "@chakra-ui/react";
import { MultiSelect, SelectFilter, useMultiSelect } from "chakra-multiselect";
import React, { useEffect } from "react";

const MultiselectInput = (props: {
  options: any;
  value: any;
  onChange: any;
}) => {
  const { value, options, onChange } = useMultiSelect({
    value: props.value,
    options: props.options,
    onChange: props.onChange,
  });

  const handleOnChange = (value: any) => {
    onChange(value);
  };

  return (
    <Box
      sx={{
        "div[role=list]": {
          display: "flex",
          gap: "0.25rem",
          width: "100%",
          flexWrap: "wrap",
        },
        ".chakra-stack": {
          px: "0.25rem",
          py: "0.15rem",
          height: "auto",
          alignItems: "center"
        },
        input: {
          outline: "none",
          background: "transparent",
          flexGrow: "1"
        },
        ul: {
          width: "100%",
          background: "white",
          zIndex: 1000,
          border: "1px solid #eee",
          borderRadius: "0.25rem",
          boxShadow: "lg",
        },
        "ul li": {
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          px: "0.5rem",
          fontSize: [11, 12, 13],
          color: "#444",
        },
        "ul li:hover": {
          background: "#f9f9f9",
          cursor: "pointer",
        },
        "span[role=listitem]": {
          my: "0.15rem"
        },
      }}
    >
      <MultiSelect
        options={options}
        value={value}
        onChange={handleOnChange}
        filterFn={(o, searchValue) =>
          o.filter((option) =>
            option.label
              .toLowerCase()
              .includes(searchValue.toString().toLowerCase())
          )
        }
        paddingX={0}
      />
    </Box>
  );
};

export default MultiselectInput;
