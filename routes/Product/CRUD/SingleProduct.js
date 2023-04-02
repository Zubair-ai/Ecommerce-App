import express from "express";
import Product from "../../../modules/Product.js";

const router=express.Router();



router.get("/getproduct/:slug", async (req,res)=>{
    try {
        const product= await Product.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success:true,
            message:"getting single product successfully",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting single product",
            error:error.message
        })
    }
})




export default router;