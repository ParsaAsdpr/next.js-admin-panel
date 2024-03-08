import {
  Box,
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { FaBell, FaRegBell } from "react-icons/fa";
import ButtonComponent from "../common/ButtonComponent";

const NotificationButton = () => {
  const badgeSize = {
    base: "1rem",
  };
  const notifications = [
    { title: "سلام" },
    {
      title:
        "سلام ت ینت سنتبد سنتیدبستند بسنتدب ستند نستد یتسید بتنسدیبتنسدین تسدتند سنتدب سنتدب سند س",
    },
  ];

  return (
    <Menu>
      <Tooltip aria-label="hi" label="اعلان ها" hasArrow>
        <MenuButton
          as={Box}
          cursor="pointer"
          userSelect="none"
          rounded="100%"
          _hover={{ bg: "#00000010" }}
        >
          <Stack
            fontSize={25}
            color="#888"
            cursor="pointer"
            position="relative"
            p={1.5}
            transition="0.2s"
          >
            <Text
              color="#fff"
              bg="#ff4b5b"
              rounded="9999px"
              boxSize={badgeSize}
              lineHeight={badgeSize}
              fontSize={10}
              textAlign="center"
              position="absolute"
              transform="translateX(30%) translateY(100%)"
              top="-50%"
              fontWeight={900}
            >
              1
            </Text>
            <Icon as={FaRegBell} />
          </Stack>
        </MenuButton>
      </Tooltip>

      <MenuList fontWeight="100" py={3} px={2} rounded={8} >
        {notifications.map((notif) => (
          <HStack
            key={notif.title}
            cursor="pointer"
            role="group"
            _hover={{ bg: "#23a19410" }}
            p={3}
            rounded={5}
            transition="0.2s all"
            width="320px"
            spacing={3}
            mb={1}
          >
            {/* PRIMARY COLOR */}
            <Icon
              fontSize={18}
              as={FaBell}
              _groupHover={{ color: "teal" }}
              transition="0.2s all"
              color="#bbb"
            />
            <Text
              fontSize={12}
              _groupHover={{ color: "teal" }}
              transition="0.2s all"
              color="#555"
              isTruncated
            >
              {notif.title}
            </Text>
          </HStack>
        ))}
        <ButtonComponent
          width="100%"
          bg="#23a19430"
          color="#1b887d"
          _hover={{ bg: "#23a19420", color: "#10665d" }}
          transition="0.2s"
          mt={1}
          fontWeight={300}
        >
          مشاهده همه اعلان ها
        </ButtonComponent>
      </MenuList>
    </Menu>
  );
};

export default NotificationButton;
