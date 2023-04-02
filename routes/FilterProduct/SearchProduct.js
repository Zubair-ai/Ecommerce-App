import express from "express";
import Product from "../../modules/Product.js";
const router = express.Router();

router.get("/searchproduct/:keyword", async (req, res) => {
  try {
    const {keyword} = req.params;
    const products = await Product.find({
        $or: [
            {name:{$regex :keyword, $options:"i"}},
            {description:{$regex :keyword, $options:"i"}}
        ]
    }).select("-photo")
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
});

export default router;