"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "../core/contexts/User.Context";

export const queryClient = new QueryClient({});

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={extendTheme({ direction: "rtl" })}>
      <UserProvider>
        {children}
        </UserProvider>
        </ChakraProvider>
    </QueryClientProvider>
  );
};

export default PageWrapper;
