import express from "express";
import Category from "../../modules/Category.js";

const router =express.Router();

router.get("/singlecategory/slug",async(req,res)=>{
    try {
        const category= await Category.findOne({slug:req.params.slug});
        res.status(200).send({
            success:true,
            message:"you get signle category",
            category,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:" something went wrong while geeting category",
            error,
        })
    }
})

export default router;