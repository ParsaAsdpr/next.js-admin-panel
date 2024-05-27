import UsersTable from "./UsersTable";
import { VStack } from "@chakra-ui/react";
import { metadata } from "../../layout";

metadata.title = "لیست کاربران";

const page = async () => {
  return (
    <VStack
      w={{ base: "100%", xl: "980px", "2xl": "1280px" }}
      mx="auto"
      py={5}
      spacing={2}
    >
      <UsersTable />
    </VStack>
  );
};

export default page;
