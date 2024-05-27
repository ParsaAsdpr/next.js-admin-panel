import React, { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getItem } from "../../core/cookie/cookie";
import { jwtDecode } from "jwt-decode";
import User from "../../core/types/User";

export default function withAuth(WrappedComponent: any) {
  return function withAuth({ ...props }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState<User>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { replace } = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      const userToken = getItem("token");
      if (userToken) {
        const decodedToken: User = jwtDecode(userToken);
        setUser(decodedToken);
      } else replace("/login");
    }, []);

    if(user === null) return null

    return <WrappedComponent {...props} />;
  };
}
