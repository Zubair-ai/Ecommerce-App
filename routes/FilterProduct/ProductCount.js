import express from "express";
import Product from "../../modules/Product.js";
const router = express.Router();

router.get("/productcount", async (req, res) => {
  try {
    // to count the product we use estimatedDocumentCount()
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in product count",
      error,
    });
  }
});

export default router;