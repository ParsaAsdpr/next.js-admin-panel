"use client";
import { useToast } from "@chakra-ui/react";
import schema from "./schema";
import { toastConfig } from "../../../libs/toastConfig";
import { useRouter } from "next/navigation";
import Form from "../../../components/common/Form";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  isActive: boolean;
};

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
    options: [{ label: "کاربر", value: "user" }],
  },
  { name: "isActive", type: "switch", label: "وضعیت" },
];

const EditForm = () => {
  const router = useRouter();
  const toast = useToast(toastConfig);

  const defaultValues: Inputs = {
    name: "",
    role: "user",
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
      router.push("/users");
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

export default EditForm;
