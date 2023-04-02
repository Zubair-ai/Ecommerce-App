import express from "express";
import Product from "../../../modules/Product.js";
import Category from "../../../modules/Category.js";

const router=express.Router();



router.get("/selectedcategory/:slug", async (req,res)=>{
    const {slug}=req.params;
    try {
        const category= await Category.findOne({slug});
        const products= await Product.find({category}).populate("category").select("-photo");
        res.status(200).send({
            success:true,
            message:"All products",
            products,
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting products",
            error:error.message
        })
    }
})




export default router;