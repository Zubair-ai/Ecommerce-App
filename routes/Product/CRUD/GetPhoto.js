import express from "express";
import Product from "../../../modules/Product.js";

const router = express.Router();

router.get("/getphoto/:id", async (req, res) => {
  const { id } = req.params;
  console.log("ID in get Photo", id);
  try {
    const product = await Product.findById(id).select("photo");
    console.log("productphoto".product);
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting product photo",
      error,
    });
  }
});

export default router;
