import express from "express";
import slugify from "slugify";
import { isAdmin } from "../../middlewares/AdminMiddlewares.js";
import { middlewaresForSigninUser } from "../../middlewares/userMiddleware.js";
import Category from "../../modules/Category.js";

const router = express.Router();

router.put(
  "/updatecategory/:id",
  middlewaresForSigninUser,
  isAdmin,
  async (req, res) => {
    const { name } = req.body;
    const {id} = req.params;
    console.log("id", req.params);
    console.log("name", name);
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name: name, slug: slugify(name) },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Category Updated Successfully",
        updatedCategory,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: " something went wrong Category not Updated",
        error,
      });
    }
  }
);

export default router;
