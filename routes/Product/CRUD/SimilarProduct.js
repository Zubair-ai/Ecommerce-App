import express from "express";
import Product from "../../../modules/Product.js";

const router = express.Router();

router.get("/similarproduct/:pid/:cid", async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await Product.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category"); // corrected typo here
    res.status(200).send({
      success: true,
      message: "Getting similar products successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting similar products",
      error: error.message,
    });
  }
});

export default router;
