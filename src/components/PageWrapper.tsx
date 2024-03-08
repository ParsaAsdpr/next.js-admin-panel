"use client";
import {
  Box,
  ChakraProvider,
  Divider,
  extendTheme,
  Flex,
  HStack,
  Icon,
  Image,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { ReactNode, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import SidebarNavItem from "./SidebarNavItem";
import SidebarNavItemType from "../types/SidebarNavItemType";
import Header from "./Header/Header";
import { usePathname } from "next/navigation";
import getTitleForRoute from "../libs/getTitleForRoute";
import { QueryClient, QueryClientProvider } from "react-query";

type Props = {
  children: ReactNode;
};

export const queryClient = new QueryClient({});

const PageWrapper = ({ children }: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const pathname = usePathname();
  const sidebarSize = ["220px", "240px", "260px", "280px", "300px"];

  useEffect(() => {
    const title = getTitleForRoute(pathname);
    setTitle(title);
  }, [pathname]);

  const navitems: SidebarNavItemType[] = [
    { label: "داشبورد", url: "/" },
    {
      label: "مدیریت",
      submenus: [
        { label: "کاربران", url: "/users" },
        { label: "ادمین ها", url: "/admins" },
      ],
    },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={extendTheme({ direction: "rtl" })}>
        <Flex dir="rtl">
          {/* SIDEBAR */}
          <Box
            as="aside"
            height="100vh"
            width={sidebarSize}
            bgGradient="linear(to-b, #1b887d, #4aeedd)"
            pt={12}
            position="fixed"
            right={{ base: isSidebarOpen ? "0" : "-100%", md: 0 }}
            transition="0.2s all ease-out"
            overflowY="scroll"
            zIndex={99}
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#ffffffaa",
                borderRadius: "24px",
              },
            }}
            roundedBottomLeft={20}
          >
            <VStack px={3} alignItems="center" spacing={4}>
              <Image
                src="https://i.pravatar.cc/300"
                alt="..."
                borderRadius={999}
                boxSize={["4.5rem", "5rem", "5.5rem", "6rem"]}
              />
              <Text fontWeight={600} textColor="white">
                محمد محمدی
              </Text>
              <HStack fontSize={12} color="#ccc">
                <Icon as={FaUser} />
                <Text>ادمین</Text>
              </HStack>
              <Divider />
            </VStack>

            <VStack mt={3} spacing={1} pr={1} userSelect="none">
              {navitems.map((navitem) => (
                <SidebarNavItem
                  key={navitem.label}
                  label={navitem.label}
                  url={navitem.url}
                  submenus={navitem.submenus}
                />
              ))}
            </VStack>
          </Box>

          <VStack
            mr={[0, 0, ...sidebarSize.slice(2)]}
            flexGrow="1"
            px={{ base: 0, sm: 4 }}
            alignItems="start"
          >
            <Header title={title} onMenuClick={setSidebarOpen} />
            {children}
          </VStack>

          <Show below="md">
            <Box
              bg="#00000060"
              position="fixed"
              height="100%"
              width="100%"
              top="0"
              visibility={isSidebarOpen ? "visible" : "hidden"}
              opacity={isSidebarOpen ? "1" : "0"}
              transition="0.2s all"
              zIndex={98}
              onClick={() => setSidebarOpen(false)}
            ></Box>
          </Show>
        </Flex>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default React.memo(PageWrapper);
