import express from "express";
import Order from "../../modules/Order.js";
import { middlewaresForSigninUser } from "../../middlewares/userMiddleware.js";
import dotenv from "dotenv";
import braintree from "braintree";

dotenv.config();

const router = express.Router();

// payments related

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MECHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_ID,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

router.post("/payments", middlewaresForSigninUser, async (req, res) => {
    try {
        const { nonce, Cart } = req.body;
        let total = 0;
        Cart.map((i) => {
          total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
          {
            amount: total,
            paymentMethodNonce: nonce,
            options: {
              submitForSettlement: true,
            },
          },
          function (error, result) {
            if (result) {
              const order = new Order({
                products: Cart,
                payment: result,
                buyer: req.user?._id,
              }).save();
              res.json({ ok: true });
            } else {
              res.status(500).send(error);
            }
          }
        );
      } catch (error) {
        console.log(error);
      
    }
    
});

export default router;
