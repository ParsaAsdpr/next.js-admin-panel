import React, { ChangeEvent } from "react";
import { Control, Controller } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Switch,
} from "@chakra-ui/react";

interface Props<T> {
  type: "text" | "password" | "email" | "number" | "switch" | string;
  control: Control<T>;
  label: string;
  name: string;
  helperText?: string;
  placeholder: string;
  options?: {
    label: string;
    value: string | boolean | number;
  }[];
}

const FormInput = ({
  type,
  control,
  label,
  helperText,
  name,
  placeholder,
  options,
}: Props<any>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { name, onChange, value },
        fieldState: { error },
        formState: { defaultValues },
      }) => (
        <FormControl isInvalid={error && true} w="100%">
          <FormLabel fontSize={[11, 12, 13]} htmlFor={name}>
            {label}
          </FormLabel>

          {type === "switch" ? (
            <Switch
              name={name}
              id={name}
              size="lg"
              defaultChecked={defaultValues?.[name]}
              isChecked={value}
              onChange={(e) => {
                onChange(e.currentTarget.checked);
              }}
            />
          ) : type === "select" ? (
            <Select
              name={name}
              id={name}
              onChange={(e) => {
                onChange(e.currentTarget.value);
              }}
              fontSize={[11, 12, 13]}
            >
              {options
                ? options.map((option) => (
                    <option key={option.label} value={option.value.toString()}>
                      {option.label}
                    </option>
                  ))
                : null}
            </Select>
          ) : (
            <Input
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              defaultValue={defaultValues?.[name] || ""}
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value);
              }}
              fontSize={[11, 12, 13]}
            />
          )}

          {helperText && !error && (
            <FormHelperText fontSize={[9, 10, 11]}>{helperText}</FormHelperText>
          )}
          {error && (
            <FormErrorMessage fontSize={[9, 10, 11]}>
              {error.message}
            </FormErrorMessage>
          )}
        </FormControl>
      )}
    ></Controller>
  );
};

export default FormInput;
