import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface Props extends ButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
  isSubmit?: boolean;
  colorScheme?: string;
  isResponsive?: boolean;
}

const ButtonComponent = ({
  size = "md",
  variant = "solid",
  isSubmit,
  colorScheme = "teal",
  children,
  isResponsive,
  ...rest
}: Props) => {
  return (
    <Button
      w={isResponsive && { base: "100%", md: "auto" }}
      fontSize={
        size === "sm" ? [10, 11] : "md" ? [11, 12] : [12, 13]
      }
      colorScheme={colorScheme}
      variant={variant}
      size={size}
      type={isSubmit ? "submit" : "button"}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
