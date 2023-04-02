import express from "express";
import { middlewaresForSigninUser } from "../../middlewares/userMiddleware.js";
import {isAdmin} from "../../middlewares/AdminMiddlewares.js";
import Product from "../../modules/Product.js";
import slugify from "slugify";
import Formidable from "express-formidable";
import fs from "fs";

const router =express.Router();

router.post("/createproduct",middlewaresForSigninUser,isAdmin,Formidable(), async(req,res)=>{
    const {name,slug,description,price,category,quantity,shipping}=req.fields;
    const {photo}=req.files;
    if(!name){
        return res.status(500).send({message:"name is required"})
    }
    if(!price){
        return res.status(500).send({message:"price is required"})
    }
    if(!description){
        return res.status(500).send({message:"description is required"})
    }
    if(!category){
        return res.status(500).send({message:"category is required"})
    }
    if(!quantity){
        return res.status(500).send({message:"quantity is required"})
    }
    if(!photo && photo.size >1000000){
        return res.status(500).send({message:"photo is required less then 1mb"})
    }
    try {
        const product= new Product({...req.fields,slug: slugify(name)});
        if(photo){
            product.photo.data=fs.readFileSync(photo.path)
            product.photo.contentType=photo.type;
        }
         await product.save();
        res.status(201).send({
            success:true,
            message:"your Product add successfully",
            product,
        })
       
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in creating Products",
            error,
        })
    }
})

export default router; 