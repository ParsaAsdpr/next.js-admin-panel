"use client";
import { useToast } from "@chakra-ui/react";
import schema from "./schema";
import { toastConfig } from "../../../../core/libs/toastConfig";
import { useRouter } from "next/navigation";
import Form from "../../../../components/common/Form";
import { useQuery } from "react-query";
import Role from "../../../../core/types/Role";
import { useEffect, useState } from "react";
import { useUser } from "../../../../core/contexts/User.Context";
import useAuth from "../../../../core/hooks/useAuth";
import withAdmin from "../../../../components/hoc/withAdmin";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  isActive: boolean;
};

const CreateUserForm = () => {
  const router = useRouter();
  const toast = useToast(toastConfig);

  const { data } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/roles`
      );
      const data = await res.json();
      return data.data;
    },
  });

  const inputFields = [
    {
      name: "name",
      type: "text",
      label: "نام",
      helperText: "نام کاربر را وارد کنید",
    },
    {
      name: "email",
      type: "email",
      label: "ایمیل",
      helperText: "ایمیل کاربر را وارد کنید",
      placeholder: "example@example.com",
    },
    {
      name: "password",
      type: "password",
      label: "گذرواژه",
      helperText: "گذرواژه کاربر را وارد کنید",
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "تکرار گذرواژه",
      helperText: "گذرواژه کاربر را وارد کنید",
    },
    {
      name: "role",
      type: "select",
      label: "نقش",
      helperText: "نقش کاربر را انتخاب کنید",
      options: data?.map((role: Role) => ({
        label: role.name,
        value: role.id.toString(),
      })),
    },
    { name: "isActive", type: "switch", label: "وضعیت" },
  ];

  const defaultValues: Inputs = {
    name: "",
    role: "1",
    email: "",
    password: "",
    confirmPassword: "",
    isActive: false,
  };

  const handleOnSuccess = (res) => {
    if (res.status >= 400 && res.status < 500)
      toast({
        title: "خطایی رخ داده است",
        description: res.statusText,
        status: "error",
      });
    else {
      router.push("/admin/users");
      toast({
        title: "کاربر با موفقیت ایجاد شد",
        status: "success",
      });
    }
  };
  const handleOnError = (error: any) => {
    toast({
      title: "خطایی رخ داده است",
      description: error.message,
      status: "error",
    });
  };

  return (
    <>
      <Form
        inputs={inputFields}
        schema={schema}
        defaultValues={defaultValues}
        onError={handleOnError}
        onSuccess={handleOnSuccess}
        apiEndpoint="api/users"
        fetchOptions={{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }}
      />
    </>
  );
};

export default withAdmin(CreateUserForm);
