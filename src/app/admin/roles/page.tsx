import RolesTable from "./RolesTable";
import { VStack } from "@chakra-ui/react";
import { metadata } from "../../layout";

metadata.title = "لیست نقش ها";

const page = async () => {
  return (
    <VStack
      w={{ base: "100%", xl: "980px", "2xl": "1280px" }}
      mx="auto"
      py={5}
      spacing={2}
    >
      <RolesTable />
    </VStack>
  );
};

export default page;
