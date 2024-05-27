import React from "react";
import EditRoleForm from "./EditRoleForm";
import { Box } from "@chakra-ui/react";
import { metadata } from "../../../../layout";

metadata.title = "ویرایش نقش";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <Box px={6} width="100%">
      <EditRoleForm roleId={params.id} />
    </Box>
  );
};

export default page;
