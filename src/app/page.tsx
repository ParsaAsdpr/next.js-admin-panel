import { HStack } from "@chakra-ui/react";
import React from "react";
import ButtonComponent from "../components/common/ButtonComponent";
import { cookies } from "next/headers";
import Link from "next/link";

const page = () => {
  const cookieStore = cookies();

  if (cookieStore.get("token")) {
    return (
      <HStack py={2} px={4} justifyContent="center">
        <ButtonComponent as={Link} href="/admin" size="lg">
          پنل ادمین
        </ButtonComponent>
      </HStack>
    );
  }
  return (
    <HStack py={2} px={4} justifyContent="center">
      <ButtonComponent as={Link} href="/login" size="lg">
        ورود
      </ButtonComponent>
      <ButtonComponent as={Link} href="/signup" size="lg" variant="outline">
        ثبت نام
      </ButtonComponent>
    </HStack>
  );
};

export default page;
