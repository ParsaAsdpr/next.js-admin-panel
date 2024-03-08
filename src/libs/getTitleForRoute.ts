const getTitleForRoute = (pathname: string) => {
    const routeTitles = {
        "/": "داشبورد",
        "/users": "لیست کاربران",
        "/users/create": "افزودن کاربر",
        "/users/edit": "ویرایش کاربر",
        "/users/:id": "جزئیات کاربر",
    }

    return routeTitles[pathname];
}

export default getTitleForRoute;