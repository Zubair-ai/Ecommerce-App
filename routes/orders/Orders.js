import express from "express";
import Order from "../../modules/Order.js";
import { middlewaresForSigninUser } from "../../middlewares/userMiddleware.js";
const router =express.Router();

router.get("/orders",middlewaresForSigninUser,async(req,res)=>{
    try {
        const orders = await Order
          .find({})
          .populate("products", "-photo")
          .populate("buyer", "name")
          .sort({ createdAt: "-1" });
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error WHile Geting Orders",
          error,
        });
      }
})

export default router;