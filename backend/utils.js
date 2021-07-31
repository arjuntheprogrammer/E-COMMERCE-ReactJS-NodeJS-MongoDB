import config from "./config";
import jwt from "jsonwebtoken";

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    // Bearer XXXXXX
    const token = authorization.slice(7, authorization.length);

    jwt.verify(token, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          msg: "Invalid Token",
        });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({
      msg: "Token is not supplied.",
    });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({
    msg: "Admin Token is not valid.",
  });
};

export { getToken, isAuth, isAdmin };
