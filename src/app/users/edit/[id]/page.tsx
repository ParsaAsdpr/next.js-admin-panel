import React from "react";
import EditForm from "./EditUserForm";
import { Box } from "@chakra-ui/react";
import { metadata } from "../../../layout";

metadata.title = "ویرایش کاربر";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <Box px={6} width="100%">
      <EditForm userId={params.id} />
    </Box>
  );
};

export default page;
