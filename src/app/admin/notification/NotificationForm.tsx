"use client";
import { useToast } from "@chakra-ui/react";
import schema from "./schema";
import { toastConfig } from "../../../core/libs/toastConfig";
import { useRouter } from "next/navigation";
import Form from "../../../components/common/Form";
import { useQuery } from "react-query";
import Role from "../../../core/types/Role";
import withAdmin from "../../../components/hoc/withAdmin";
import User from "../../../core/types/User";
import MultiselectInput from "../../../components/common/formInputs/MultiSelectInput";
import { getItem } from "../../../core/cookie/cookie";

type Inputs = {
  body: String;
  allUsers: Boolean;
  receivers: any[];
};

const NotificationForm = () => {
  const router = useRouter();
  const toast = useToast(toastConfig);

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`
      );
      const data = await res.json();
      return data.data;
    },
  });

  const inputFields = [
    {
      name: "body",
      type: "text",
      label: "متن اعلان",
      helperText: "متن اعلان را وارد کنید",
    },
    {
      name: "allUsers",
      type: "switch",
      label: "ارسال به تمام کاربران",
    },
    {
      name: "receivers",
      type: "multiselect",
      label: "کاربر",
      helperText: "کاربر را انتخاب کنید",
      options: data?.map((user: User) => ({
        label: user.name,
        value: user.id.toString(),
      })),
    },
  ];

  const defaultValues: Inputs = {
    body: "",
    allUsers: false,
    receivers: [],
  };

  const handleOnSuccess = (res) => {
    if (res.status >= 400 && res.status < 500)
      toast({
        title: "خطایی رخ داده است",
        description: res.statusText,
        status: "error",
      });
    else {
      router.push("/admin");
      toast({
        title: "اعلان با موفقیت ایجاد شد",
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
        apiEndpoint="api/notifications"
        fetchOptions={{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": getItem("token"),
          },
        }}
      />
    </>
  );
};

export default withAdmin(NotificationForm);
