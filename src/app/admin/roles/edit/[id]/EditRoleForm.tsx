"use client";
import schema from "./schema";
import { toastConfig } from "../../../../../core/libs/toastConfig";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import Form from "../../../../../components/common/Form";
import { useToast } from "@chakra-ui/react";
import Role from "../../../../../core/types/Role";
import withAdmin from "../../../../../components/hoc/withAdmin";

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

const EditRoleForm = ({ roleId }: { roleId: string }) => {
  const router = useRouter();
  const toast = useToast(toastConfig);

  const {
    data: role,
    error,
    isLoading,
  }: { data: Role; error: any; isLoading: boolean } = useQuery({
    queryKey: ["role", roleId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/roles/${roleId}`
      );
      const data = await res.json();
      return data.role;
    },
  });

  const defaultValues: Inputs = {
    name: role?.name,
    slug: role?.slug,
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
        title: "نقش با موفقیت ویرایش شد",
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
        apiEndpoint={`api/roles/${roleId}`}
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

export default withAdmin(EditRoleForm);
