type SidebarNavItemType = {
  label: string;
  url?: string;
  submenus?: SidebarNavItemSubmenuType[];
};

export type SidebarNavItemSubmenuType = {
  label: string;
  url: string;
};

export default SidebarNavItemType;
