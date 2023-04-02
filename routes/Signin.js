import express from "express";
import { PasswordHash } from "../helpers/PassHash.js";
import user from "../modules/Users.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/signin",
  // input validation using express-validator
  [
    body("name").trim(),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("address").isString().notEmpty(),
    body("phone").isString().notEmpty(),
    body("answer").isString().notEmpty(),
  ],
  async (req, res) => {
    // check for any input validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // hash the password
    const hashedPassword = await PasswordHash(req.body.password);
    try {
      // check if email already exists
      const emailExists = await user.findOne({ email: req.body.email });
      if (emailExists) {
        console.log("in if statement")
        return res.status(409).send({
          success: false,
          message: "Email already exists",
        });
      } else {
        console.log("in else statement ")
        // save the new user to the database
         await user.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          address: req.body.address,
          phone: req.body.phone,
          answer:req.body.answer
        });

        // send a success response
        return res.status(201).send({
          success: true,
          message: "Sign up successful",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

export default router;
