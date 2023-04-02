import express from "express";
import { isAdmin } from "../middlewares/AdminMiddlewares.js";
import { middlewaresForSigninUser } from "../middlewares/userMiddleware.js";

const router =express.Router();

router.get("/adminauth", middlewaresForSigninUser,isAdmin ,(req,res)=>{
 res.status(200).send({
    ok:true
 })
});

export default router;