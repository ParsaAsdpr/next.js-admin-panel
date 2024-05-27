"use client";
import { Alert, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonComponent from "./ButtonComponent";
import { Suspense, useEffect } from "react";
import { useMutation } from "react-query";
import { dirtyValues } from "../../core/libs/dirtyValues";
import FormInput from "./formInputs/FormInput";
import { ZodSchema } from "zod";

type Props = {
  inputs: any[];
  schema: ZodSchema;
  apiEndpoint: string;
  defaultValues: any;
  isLoading?: boolean;
  error?: any;
  fetchOptions: RequestInit;
  onError: (error: any) => void;
  onSuccess: (res: any) => void;
};

const Form = ({
  schema,
  inputs,
  defaultValues,
  isLoading,
  error,
  apiEndpoint,
  fetchOptions,
  onError,
  onSuccess,
}: Props) => {
  const { mutate } = useMutation({
    mutationFn: (body: any) => {
      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiEndpoint}`, {
        ...fetchOptions,
        body: JSON.stringify(body),
      });
    },
    onError: (error: any) => onError(error),
    onSuccess: (res) => onSuccess(res),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (fetchOptions.method === "PATCH" || fetchOptions.method === "PUT") {
      const dirties = dirtyValues(dirtyFields, data);
      return mutate(dirties);
    }
    mutate(data);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  if (error) return <Alert status="error">{error.message}</Alert>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Suspense fallback={<Skeleton />}>
        <VStack py={5} w="100%" maxW="7xl" mx="auto" alignItems="start">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5} w="100%">
            {inputs.map((field) => (
              <FormInput
                key={field.name}
                name={field.name}
                type={field.type}
                label={field.label}
                helperText={field.helperText}
                control={control}
                placeholder={field.placeholder}
                options={field.options}
              />
            ))}
          </SimpleGrid>
          <ButtonComponent
            variant="solid"
            isSubmit
            size="lg"
            mt={4}
            isResponsive
          >
            ثبت
          </ButtonComponent>
        </VStack>
      </Suspense>
    </form>
  );
};

export default Form;
