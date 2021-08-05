const bcrypt = require("bcrypt");
import express from "express";
import userModel from "../models/userModel";
import { getToken } from "../utils";
import { isAuth } from "../utils";

const router = express.Router();

router.post("/signin", async (req, res) => {
  console.log("User POST /signin");
  console.log(
    "bcrypt.hashSync(req.body.password, 8) = ",
    bcrypt.hashSync(req.body.password, 8)
  );
  const signinUser = await userModel.findOne({
    email: req.body.email,
  });
  if (signinUser) {
    if (bcrypt.compareSync(req.body.password, signinUser.password)) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      });
      return;
    }
  }
  res.status(401).send({ msg: "Invalid Email or Password." });
});

router.post("/register", async (req, res) => {
  console.log("User POST /register");
  try {
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
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
  console.log("User GET /createadmin");
  try {
    const user = new userModel({
      name: "Arjun",
      email: "arjuntheprogrammer@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.get("/:id", async (req, res) => {
  console.log("User GET /:id");
  console.log("req.params.id", req.params.id);
  const user = await userModel.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ msg: "User Not Found" });
  }
});

router.put("/profile", isAuth, async (req, res) => {
  console.log("User PUT /:id");
  const user = await userModel.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ msg: "User Not Found" });
  }
});

export default router;
