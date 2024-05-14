import User from "../model/User.js";
import authToken from "../utilities/jwt.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

const registration = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ message: errors.array() });
  }
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).json({ mesage: "User already exist" });
    }
    user = new User(req.body);
    await user.save();
    authToken(res, user._id);
    res.status(200).json("User has been created");
  } catch (err) {
    res.status(500).json("error while registration");
    console.log(err);
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(500).json({ message: "Invalid Password" });
    }

    authToken(res, user._id);

    res
      .status(200)
      .json({ userData: user._doc, msg: "User has been logged in" });
  } catch (err) {
    console.log(err);
    res.status(400).json("Server error");
  }
};

const logout = (req, res) => {
  res
    .cookie("auth", "", { expires: new Date(0) })
    .status(200)
    .json({ message: "User has logged out" });
};

export { registration, login, logout };
