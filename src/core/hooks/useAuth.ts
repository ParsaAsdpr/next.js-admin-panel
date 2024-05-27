import { useEffect, useState } from "react";
import { useUser } from "../../core/contexts/User.Context";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setIsAuth(true);
      if (user.roleId === 2) setIsAdmin(true);
    } else setIsAuth(false);
  }, [user]);

  return { isAuth, isAdmin };
};

export default useAuth;
