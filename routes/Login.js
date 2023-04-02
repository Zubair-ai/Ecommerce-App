import express from "express";
import user from "../modules/Users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { middlewaresForSigninUser } from "../middlewares/userMiddleware.js";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  try {
    const userdata = await user.findOne({ email: email });
    if (!userdata) {
      return res.status(404).json({
        success: false,
        message: "Email not found, please sign up",
      });
    } else {
      const isMatch = await bcrypt.compare(password, userdata.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
      }
      
      const useremail={email:userdata.email}
      const token = jwt.sign(useremail, process.env.JWT_SECRET)
      return res.status(200).json({
        success: true,
        message: "Login successful",
        userData: {
          name: userdata.name,
          email: userdata.email,
          phone: userdata.phone,
          address: userdata.address,
          role: userdata.role
        },
         token: token,
      });
    }
  } catch (error) {
    console.log("this is error",error)
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
});

router.get("/test",middlewaresForSigninUser)
export default router;
