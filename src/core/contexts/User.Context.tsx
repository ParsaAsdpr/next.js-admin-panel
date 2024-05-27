import {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import User from "../types/User";
import { getItem } from "../cookie/cookie";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  useEffect(() => {
    const userToken = getItem("token");
    if (userToken) {
      const decodedToken: User = jwtDecode(userToken);
      setUser(decodedToken);
    } else setUser(null);
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
