type SidebarNavItemType = {
  label: string;
  url?: string;
  submenus?: SidebarNavItemSubmenuType[];
  admin?: boolean
};

export type SidebarNavItemSubmenuType = {
  label: string;
  url: string;
  admin?: boolean
};

export default SidebarNavItemType;
