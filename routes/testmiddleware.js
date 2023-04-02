import express from "express";
import { middlewaresForSigninUser } from "../middlewares/userMiddleware.js";
import { isAdmin } from "../middlewares/AdminMiddlewares.js";

const router=express.Router();

router.get("/test", middlewaresForSigninUser,isAdmin ,(req,res)=>{
 try {
    res.send({
        message:"this is test/protected router"
    })
 } catch (error) {
    console.log(error)
 }
})

export default router;