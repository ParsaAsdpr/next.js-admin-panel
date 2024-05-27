import React from "react";
import EditUserForm from "./EditUserForm";
import { Box } from "@chakra-ui/react";
import { metadata } from "../../../../layout";

metadata.title = "ویرایش کاربر";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <Box px={6} width="100%">
      <EditUserForm userId={params.id} />
    </Box>
  );
};

export default page;
