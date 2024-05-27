import jwt from "jsonwebtoken";
const generateAuthToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET);
  return token;
};

export default generateAuthToken;