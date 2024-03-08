import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Show,
} from "@chakra-ui/react";
import React from "react";
import { FaChevronDown } from "react-icons/fa";

const ProfileButton = () => {
  const menuItems = [
    { text: "پروفایل", url: "#" },
    { text: "پشتیبانی", url: "#" },
    { text: "خروج", url: "#" },
  ];

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Box}
            p={[1, 1.5]}
            _hover={{ bg: "#00000010" }}
            rounded="99999px"
            cursor="pointer"
            userSelect="none"
          >
            <HStack alignItems="center" spacing={3}>
              <Image
                src="https://i.pravatar.cc/300"
                alt="..."
                rounded="99999px"
                boxSize={["2.5rem", "3rem"]}
              />
              <Show above="sm">
                <Icon
                  as={FaChevronDown}
                  transform={isOpen && "scaleY(-1)"}
                  transition="0.3s"
                />
              </Show>
            </HStack>
          </MenuButton>
          <MenuList
            minWidth="180px"
            color="#999"
            fontSize={14}
            fontWeight="100"
            py={1}
          >
            {menuItems.map((item, i) => (
              <MenuItem
                key={item.text}
                as={Link}
                py={2}
                textAlign={"center"}
                color={item.text === "خروج" && "#ff4b5b"}
                href={item.url}
                justifyContent="center"
                _hover={{
                  textDecoration: "none",
                  ring: "none",
                  bg: "#00000008",
                }}
                _focus={{ ring: "none" }}
                mt={i != 0 && 1}
                borderBottom={
                  i != menuItems.length - 1 && "1px solid #00000010"
                }
              >
                {item.text}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default ProfileButton;
