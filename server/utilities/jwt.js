import jwt from "jsonwebtoken";

const authToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    res.cookie("auth", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "error while creating token" });
      console.log(err)
  }
};

export default authToken;