const getTitleForRoute = (pathname: string) => {
  const routeTitles = {
    "/admin": "داشبورد",
    "/admin/users": "لیست کاربران",
    "/admin/users/create": "افزودن کاربر",
    "/admin/users/edit": "ویرایش کاربر",
    "/admin/users/:id": "جزئیات کاربر",
    "/admin/roles": "لیست نقش ها",
    "/admin/roles/create": "افزودن نقش",
    "/admin/roles/edit": "ویرایش نقش",
    "/admin/roles/:id": "جزئیات نقش",
    "/admin/notifications": "لیست اعلان ها",
    "/admin/notification": "ارسال اعلان",
    "/admin/profile": "پروفایل",
  };

  return routeTitles[pathname];
};

export default getTitleForRoute;
