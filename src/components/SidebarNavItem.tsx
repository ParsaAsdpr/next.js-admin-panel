import { HStack, Icon, List, ListItem, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import SidebarNavItemType from "../core/types/SidebarNavItemType";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props extends SidebarNavItemType {
  role: string;
}
const SidebarNavItem = ({ label, url, submenus, admin, role }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(10);
  const pathname = usePathname();
  const ref = useRef<HTMLParagraphElement>();

  let props = {
    width: "100%",
    color: "#eee",
    roundedRight: 10,
    overflow: "hidden",
    cursor: "pointer",
  };

  useEffect(() => {
    if (ref.current) setHeight(ref.current.clientHeight);
  }, [ref]);

  useEffect(() => {
    if (submenus) {
      setIsOpen(submenus.some((submenu) => submenu.url === pathname));
    }
  }, [submenus, pathname]);

  return submenus ? (
    <List
      _hover={!isOpen && { bg: "#ffffff20" }}
      bg={isOpen && "#ffffff20"}
      onClick={() => setIsOpen(!isOpen)}
      maxHeight={isOpen ? "350px" : height}
      transition={`all 0.2s ${isOpen ? "ease-in" : "ease-out"}`}
      hidden={admin && role !== "admin"}
      {...props}
    >
      <HStack justifyContent="space-between" pl={4}>
        <Text py={3} px={3} roundedRight={10} fontSize={15} ref={ref}>
          {label}
        </Text>
        <Icon
          as={FaChevronDown}
          transform={isOpen && "scaleY(-1)"}
          transition="0.3s all"
        />
      </HStack>
      {submenus.map((submenu) => (
        <ListItem
          key={submenu.label}
          width="100%"
          _hover={{ bg: "#ffffff20" }}
          bg={submenu.url === pathname && "#ffffff20"}
          pr={7}
          color="#ddd"
          fontSize={12}
          textAlign="right"
        >
          <Text
            py={2}
            display="block"
            href={submenu.url}
            _hover={{ textDecoration: "none" }}
            as={Link}
          >
            {submenu.label}
          </Text>
        </ListItem>
      ))}
    </List>
  ) : (
    <Text
      as={Link}
      href={url || "#"}
      _hover={{ textDecoration: "none", bg: "#ffffff20" }}
      bg={pathname === url && "#ffffff20"}
      transition="all 0.2s"
      py={3}
      px={3}
      fontSize={15}
      hidden={admin && role !== "admin"}
      {...props}
    >
      <Text>{label}</Text>
    </Text>
  );
};

export default SidebarNavItem;
