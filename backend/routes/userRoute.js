import express from "express";
import userModel from "../models/userModel";
import { getToken } from "../utils";

const router = express.Router();

router.post("/signin", async (req, res) => {
  console.log("User /signin");
  const signinUser = await userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password." });
  }
});

router.post("/register", async (req, res) => {
  console.log("User /register");
  try {
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ msg: "Invalid User Data." });
    }
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});

router.get("/createadmin", async (req, res) => {
  console.log("User /createadmin");
  try {
    const user = new userModel({
      name: "Arjun",
      email: "arjuntheprogrammer@gmail.com",
      password: "1234",
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  console.log("User /:id");
  const user = await userModel.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ msg: "User Not Found" });
  }
});

export default router;
