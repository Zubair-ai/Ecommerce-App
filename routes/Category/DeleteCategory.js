import express from "express";
import { isAdmin } from "../../middlewares/AdminMiddlewares.js";
import { middlewaresForSigninUser } from "../../middlewares/userMiddleware.js";
import Category from "../../modules/Category.js";

const router =express.Router();

router.delete("/deletecategory/:id",middlewaresForSigninUser,isAdmin,async(req,res)=>{
    try {
        const {id} =req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"your category is deleted",
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:" something went wrong while deleting category",
            error,
        })
    }
})

export default router;