"use client";
import React, { useLayoutEffect } from "react";
import { Box, Flex, Heading, Text, useToast, VStack } from "@chakra-ui/react";
import ButtonComponent from "../../components/common/ButtonComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./schema";
import { useMutation } from "react-query";
import { toastConfig } from "../../core/libs/toastConfig";
import { useRouter } from "next/navigation";
import FormInput from "../../components/common/formInputs/FormInput";
import useAuth from "../../core/hooks/useAuth";
import { setItem } from "../../core/cookie/cookie";
import Link from "next/link";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const inputFields = [
  {
    name: "name",
    type: "text",
    label: "نام",
    helperText: "نام خود را وارد کنید",
  },
  {
    name: "email",
    type: "email",
    label: "ایمیل",
    helperText: "ایمیل خود را وارد کنید",
    placeholder: "example@example.com",
  },
  {
    name: "password",
    type: "password",
    label: "گذرواژه",
    helperText: "گذرواژه خود را وارد کنید",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "تکرار گذرواژه",
    helperText: "گذرواژه خود را تکرار کنید",
  },
];

const SignupForm = () => {
  const toast = useToast(toastConfig);
  const router = useRouter();
  const { isAuth } = useAuth();

  useLayoutEffect(() => {
    if (isAuth === null) null;
    else if (isAuth) router.replace("/admin");
  }, [isAuth, router]);

  const { mutate } = useMutation({
    mutationFn: (body: Inputs) => {
      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطایی غیرمنتظره رخ داده است",
        description: error.message,
        status: "error",
      });
    },
    onSuccess: async (res) => {
      if (res.status >= 400 && res.status < 500)
        toast({
          title: "خطایی رخ داده است",
          description: res.statusText,
          status: "error",
        });
      else {
        const token = await res.headers.get("x-auth-token");
        setItem("token", token);
        window.location.href = "/admin";
        toast({
          title: "ثبت نام با موفقیت انجام شد",
          status: "success",
        });
      }
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutate(data);
  };

  if (isAuth === null || isAuth) return null;

  return (
    <form dir="rtl" onSubmit={handleSubmit(onSubmit)}>
      <Flex
        width="100wh"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          borderRadius={10}
          py={10}
          px={16}
          bg="white"
          boxShadow={"0 0 30px 0 rgba(0,0,0,0.06)"}
        >
          <Heading textAlign="center" color="#333">
            ثبت نام
          </Heading>
          <VStack my={6} gap={3} width={["auto", "auto", "400px"]}>
            {inputFields.map((input) => (
              <FormInput
                control={control}
                label={input.label}
                key={input.name}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                helperText={input.helperText}
              />
            ))}
          </VStack>
          <ButtonComponent size="lg" isSubmit width={"100%"}>
            ثبت نام
          </ButtonComponent>
          <Text
            fontSize={[9, 10, 11]}
            color="#666"
            py={3}
            mb={2}
            sx={{
              a: { color: "teal" },
              "a:hover": { textDecoration: "underline" },
            }}
          >
            ثبت نام کردید؟ <Link href="/login">وارد شوید</Link>
          </Text>
        </Box>
      </Flex>
    </form>
  );
};

export default SignupForm;