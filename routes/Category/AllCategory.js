import express from "express";
import Category from "../../modules/Category.js";
const router =express.Router();

router.get("/allcategories",async(req,res)=>{
    try {
        const categories= await Category.find({});
        res.status(200).send({
            success:true,
            message:"All Categories List",
            categories,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:" something went wrong while geeting all categories",
            error,
        })
    }
})

export default router;