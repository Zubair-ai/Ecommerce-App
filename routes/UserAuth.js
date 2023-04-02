import express from "express";
import { middlewaresForSigninUser } from "../middlewares/userMiddleware.js";

const router =express.Router();

router.get("/userauth", middlewaresForSigninUser ,(req,res)=>{
 res.status(200).send({
    ok:true
 })
});

export default router;