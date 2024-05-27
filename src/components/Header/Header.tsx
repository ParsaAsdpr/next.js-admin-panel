import { Box, HStack, Icon, Show, Text } from "@chakra-ui/react";
import NotificationButton from "./NotificationButton";
import ProfileButton from "./ProfileButton";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { title } from "process";

type Props = {
    onMenuClick: (boolean) => void;
    title: string;
}

const Header = ({onMenuClick, title}: Props) => {
  return (
    <Box
      py={3}
      px={[2, 3, 4, 6]}
      width="100%"
      borderBottom="1px solid #00000018"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <HStack onClick={() => onMenuClick(true)}>
          <Show below="md">
            <Icon fontSize={25} as={HiOutlineMenuAlt3} />
          </Show>
          <Text fontSize={[20, 22, 24, 26, 28]} fontWeight={600} color="#444">
            {title}
          </Text>
        </HStack>

        <HStack spacing={[2, 5, 6, 7, 8]}>
          <NotificationButton />
          <ProfileButton />
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
