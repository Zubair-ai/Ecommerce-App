import express from "express";
import Product from "../../../modules/Product.js";

const router=express.Router();



router.delete("/deleteproduct/:id", async (req,res)=>{
    try {
         await Product.findByIdAndDelete(req.params.id).select("-photo")
        res.status(200).send({
            success:true,
            message:"deleteing product successfully",
            
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