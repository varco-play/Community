import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  res.json("Hello");
});
router.post("/create-user", (req, res) => {
  res.send("Create user");
});
router.get("/logout", (req, res) => {
  res.send("Logout");
});

export default router;
