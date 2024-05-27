"use client";
import { Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({
  query,
  onSearch,
}: {
  query: string;
  onSearch: (query: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState(query);
  const [isFocused, setIsFocused] = useState(false);
  const color = "#888";

  useEffect(() => {
    if (isFocused) {
      const delayDebounceFn = setTimeout(() => {
        onSearch(searchTerm);
      }, 500);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, onSearch, isFocused]);

  return (
    <InputGroup>
      <InputRightElement pl={5}>
        <Icon as={FaSearch} color={color} fontSize={19} />
      </InputRightElement>
      <Input
        bg="#eee"
        color={color}
        placeholder="جستجوی کاربر..."
        border="1px solid #ddd"
        py={5}
        rounded={8}
        fontSize={12}
        focusBorderColor="Teal"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchInput;
