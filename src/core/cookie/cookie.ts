import Cookies from "js-cookie";

const getItem = (key: string): any => {
  return Cookies.get(key) || false;
};

const setItem = (key: string, value: string): void => {
  Cookies.set(key, value);
};
const removeItem = (key: string): void | boolean => {
  return getItem(key) === false ? false : Cookies.remove(key);
};

export { getItem, removeItem, setItem };
