import React from "react";
import { metadata } from "../layout";
import Notification from "../../../core/types/Notification";
import {
  Alert,
  AlertIcon,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import displayDate from "../../../core/utils/displayDate";
import { cookies } from "next/headers";

metadata.title = "لیست اعلان ها";

const page = async () => {
  const cookieStore = cookies()

  const data: { notifications?: Notification[]; error?: string } = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications`,
    {
      headers: {
        "x-auth-token":
          cookieStore.get("token")?.value || "",
      },
      cache: "no-cache",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return data?.notifications ? (
    <List
      w={{ base: "100%", xl: "980px", "2xl": "1280px" }}
      mx="auto"
      py={5}
      spacing={2}
    >
      {data.notifications ? (
        data.notifications.map((notification, i) => (
          <ListItem
            key={notification.id}
            p={5}
            fontSize={[11, 12, 13]}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            borderTop={i === 0 ? "none" : "1px solid #ddd"}
            gap={2}
          >
            <HStack>
              <FaBell
                color={notification.isRead ? "#aaa" : "#2FB4A7"}
                fontSize={21}
                style={{ marginLeft: "5px" }}
              />
              <Text color="#555">{notification.body}</Text>
            </HStack>
            <Text color="#999" fontSize={[8, 9, 10]}>
              {displayDate(notification.sentAt)}
            </Text>
          </ListItem>
        ))
      ) : (
        <p>هیچ اعلانی وجود ندارد</p>
      )}
    </List>
  ) : data?.error ? (
    <Alert status="error">{data.error}</Alert>
  ) : (
    <Alert status="error">
      <AlertIcon />
      خطایی رخ داده است
    </Alert>
  );
};

export default page;
