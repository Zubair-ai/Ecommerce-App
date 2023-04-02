import express from "express";
import { PasswordHash } from "../helpers/PassHash.js";
import user from "../modules/Users.js";


const router = express.Router();

router.put("/updateuser", async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const isUser= await user.findOne({email});
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await PasswordHash(password) : undefined;
    const updatedUser = await user.findByIdAndUpdate(
      isUser._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
});

export default router;
