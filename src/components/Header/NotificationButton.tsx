"use client";
import {
  Box,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaBell, FaRegBell } from "react-icons/fa";
import ButtonComponent from "../common/ButtonComponent";
import { useMutation, useQuery } from "react-query";
import { getItem } from "../../core/cookie/cookie";
import Link from "next/link";
import Notification from "../../core/types/Notification";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const NotificationButton = () => {
  const pathname = usePathname();
  // GETTING NOTIFICATIONS
  const {
    data,
    refetch,
  }: { data: { notifications: Notification[] }; refetch: () => void } =
    useQuery({
      queryKey: ["notifications"],
      queryFn: () => {
        return fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications`,
          {
            headers: {
              "x-auth-token": getItem("token"),
            },
          }
        ).then((res) => res.json());
      },
      refetchInterval: 5000,
    });

  // READING NOTIFICATIONS
  const { mutate } = useMutation({
    mutationKey: ["notifications"],
    mutationFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications`, {
        headers: {
          "x-auth-token": getItem("token"),
        },
        method: "PATCH",
      }).then((res) => res.json()),
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    refetch();
  }, [pathname])

  const getUnreadNotifications = () => {
    return data?.notifications?.filter((notification) => !notification.isRead);
  };

  const anim = {
    hidden: {
      scale: 0,
      opacity: 0,
      y: 10,
    },
    visible: {
      scale: [0.5, 1.2, 1],
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const badgeSize = {
    base: "1rem",
  };

  return (
    <Menu>
      <Tooltip aria-label="hi" label="اعلان ها" hasArrow>
        <MenuButton
          as={Box}
          cursor="pointer"
          userSelect="none"
          rounded="100%"
          _hover={{ bg: "#00000010" }}
          onClick={() => mutate()}
        >
          <Stack
            fontSize={25}
            color="#888"
            cursor="pointer"
            position="relative"
            p={1.5}
            transition="0.2s"
          >
            {data?.notifications && getUnreadNotifications().length > 0 && (
              <motion.div
                variants={anim}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: "-10%",
                  translateX: "20%",
                  translateY: "20%",
                }}
              >
                <Text
                  color="#fff"
                  bg="#ff4b5b"
                  rounded="9999px"
                  boxSize={badgeSize}
                  lineHeight={badgeSize}
                  fontSize={10}
                  textAlign="center"
                  fontWeight={900}
                >
                  {getUnreadNotifications().length}
                </Text>
              </motion.div>
            )}
            <Icon as={FaRegBell} />
          </Stack>
        </MenuButton>
      </Tooltip>

      <MenuList fontWeight="100" py={3} px={2} rounded={8}>
        {data?.notifications ? (
          data.notifications.slice(0, 5).map((notif) => (
            <HStack
              key={notif.id}
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
                {notif.body}
              </Text>
            </HStack>
          ))
        ) : (
          <Text fontSize={[9, 10, 11]} textAlign="center" py={3} color="#555">
            هیچ اعلانی ندارید
          </Text>
        )}
        <ButtonComponent
          width="100%"
          bg="#23a19430"
          color="#1b887d"
          _hover={{ bg: "#23a19420", color: "#10665d" }}
          transition="0.2s"
          mt={1}
          fontWeight={300}
          as={Link}
          href="/admin/notifications"
        >
          مشاهده همه اعلان ها
        </ButtonComponent>
      </MenuList>
    </Menu>
  );
};

export default NotificationButton;
