import express from "express";
import { PasswordHash } from "../helpers/PassHash.js";
import user from "../modules/Users.js";
const router = express.Router();

router.post("/forgetpassword", async (req, res) => {
  const { email, newPassword, answer } = req.body;
  if (!email) {
    return res.status(500).send("email is required");
  }
  if (!newPassword) {
    return res.status(500).send("newpassword is required");
  }
  if (!answer) {
    return res.status(500).send("answer is required");
  }

  try {
    const isUser = await user.findOne({ email, answer });
    if (!isUser) {
      return res.status(400).send({
        success: false,
        message: "Please SignIn first",
      });
    } else {
      const hashedPassword = await PasswordHash(newPassword);
      await user.findByIdAndUpdate(isUser._id, { password: hashedPassword });
      res.status(200).send({
        success: true,
        message: "your password is reset successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "some thing went wrong Email or answer",
      error,
    });
  }
});

export default router;