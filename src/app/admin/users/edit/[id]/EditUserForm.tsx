"use client";
import schema from "./schema";
import { toastConfig } from "../../../../../core/libs/toastConfig";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import Form from "../../../../../components/common/Form";
import User from "../../../../../core/types/User";
import { useToast } from "@chakra-ui/react";
import Role from "../../../../../core/types/Role";
import withAdmin from "../../../../../components/hoc/withAdmin";

type Inputs = {
  name: string;
  email: string;
  role: string;
  isActive: boolean;
};

const EditUserForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const toast = useToast(toastConfig);

  const { data: roles }: { data: Role[] } = useQuery({
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
      name: "role",
      type: "select",
      label: "نقش",
      helperText: "نقش کاربر را انتخاب کنید",
      options: roles?.map((role) => ({
        label: role.name,
        value: role.id.toString(),
      })),
    },
    { name: "isActive", type: "switch", label: "وضعیت" },
  ];

  const {
    data: user,
    error,
    isLoading,
  }: { data: User; error: any; isLoading: boolean } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`
      );
      const data = await res.json();
      return data.user;
    },
  });

  const defaultValues: Inputs = {
    name: user?.name,
    role: user?.role.toString(),
    email: user?.email,
    isActive: user?.isActive,
  };

  const handleOnSuccess = (res) => {
    if (res.status >= 400 && res.status < 500)
      toast({
        title: "خطایی رخ داده است",
        description: res.statusText,
        status: "error",
      });
    else {
      router.push("/users");
      toast({
        title: "کاربر با موفقیت ویرایش شد",
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
        apiEndpoint={`api/users/${userId}`}
        isLoading={isLoading}
        error={error}
        fetchOptions={{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }}
      />
    </>
  );
};

export default withAdmin(EditUserForm);
