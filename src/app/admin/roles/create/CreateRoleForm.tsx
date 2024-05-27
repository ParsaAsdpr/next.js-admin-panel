"use client";
import { useToast } from "@chakra-ui/react";
import schema from "./schema";
import { toastConfig } from "../../../../core/libs/toastConfig";
import { useRouter } from "next/navigation";
import Form from "../../../../components/common/Form";
import withAdmin from "../../../../components/hoc/withAdmin";

type Inputs = {
  name: string;
  slug: string;
};

const inputFields = [
  {
    name: "name",
    type: "text",
    label: "نام نقش",
    helperText: "نام نقش را وارد کنید",
  },
  {
    name: "slug",
    type: "text",
    label: "شناسه نقش",
    helperText: "شناسه نقش را وارد کنید",
    placeholder: "تنها با حروف لاتین",
  },
];

const CreateRoleForm = () => {
  const router = useRouter();
  const toast = useToast(toastConfig);

  const defaultValues: Inputs = {
    name: "",
    slug: "",
  };

  const handleOnSuccess = (res) => {
    if (res.status >= 400 && res.status < 500)
      toast({
        title: "خطایی رخ داده است",
        description: res.statusText,
        status: "error",
      });
    else {
      router.push("/roles");
      toast({
        title: "نقش با موفقیت ایجاد شد",
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
        apiEndpoint="api/roles"
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

export default withAdmin(CreateRoleForm);
