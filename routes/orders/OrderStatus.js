import express from "express";
import Order from "../../modules/Order.js";
import { middlewaresForSigninUser } from "../../middlewares/userMiddleware.js";
import { isAdmin } from "../../middlewares/AdminMiddlewares.js";
const router =express.Router();

router.put("/orderstatus/:orderId",middlewaresForSigninUser,isAdmin,async(req,res)=>{
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await Order.findByIdAndUpdate(
          orderId,
          { status },
          { new: true }
        );
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error While Updateing Order",
          error,
        });
      }
})

export default router;