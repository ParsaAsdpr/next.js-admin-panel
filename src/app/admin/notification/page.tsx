import React from "react";
import { metadata } from "../layout";
import NotificationForm from "./NotificationForm";
import { Box } from "@chakra-ui/react";

metadata.title = "ارسال اعلان";

const page = async () => {
  return (
    <Box px={6} width="100%">
      <NotificationForm />
    </Box>
  );
};

export default page;
