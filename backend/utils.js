import config from "./config";
import jwt from "jsonwebtoken";

const getToken = (user) => {
  console.log("******user***** = ", user);
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

export default getToken;
