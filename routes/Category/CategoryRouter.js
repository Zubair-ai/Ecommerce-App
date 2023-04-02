import express from "express";
import { middlewaresForSigninUser } from "../../middlewares/userMiddleware.js";
import {isAdmin} from "../../middlewares/AdminMiddlewares.js";
import Category from "../../modules/Category.js";
import slugify from "slugify";

const router =express.Router();

router.post("/createcategory",middlewaresForSigninUser,isAdmin, async(req,res)=>{
    const {name}=req.body;
    if(!name){
        return res.status(401).send({
            message:"Name is required"
        })
    }
    try {
    const isExistCategory= await Category.findOne({name});
    if(isExistCategory){
        return res.status(402).send({
            success:false,
            message:"Category already exists"
        })
    }else{
        const enterCategory=await Category.create({name:name,slug: slugify(name)});
        res.status(201).send({
            success:true,
            message:"your Category add successfully",
            enterCategory
        })
    }
       
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in category",
            error,
        })
    }
})

export default router;