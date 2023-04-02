import express from "express";
import Product from "../../modules/Product.js";
const router = express.Router();

router.post("/loadmoreproduct/:page", async (req, res) => {
  try {
    // load more product based on page
    const perPage = 5;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in product per page",
      error,
    });
  }
});

export default router;
