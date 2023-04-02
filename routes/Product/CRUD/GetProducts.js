import express from "express";
import Product from "../../../modules/Product.js";

const router=express.Router();



router.get("/getproducts", async (req,res)=>{
    try {
        const products= await Product.find({}).populate("category").select("-photo").limit(22).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            countTotal:products.length,
            message:"All products",
            products
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