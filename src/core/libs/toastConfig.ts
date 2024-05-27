import { ToastProps } from "@chakra-ui/react";

export const toastConfig: ToastProps = {
    position: "bottom-left",
    fontSize: [9, 10, 11],
    isClosable: true,
    duration: 3000,
    containerStyle: {
        zIndex: 1000,
    },
}