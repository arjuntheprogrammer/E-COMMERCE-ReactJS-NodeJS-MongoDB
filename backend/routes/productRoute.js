import express from "express";
import productModel from "../models/productModel";
import { isAuth, isAdmin } from "../utils";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("GET: /products");
  const products = await productModel.find({});
  res.send({
    products,
  });
});
router.get("/:id", async (req, res) => {
  console.log("GET: /product ID");
  const product = await productModel.findById(req.params.id);
  if (product) {
    res.send({
      product,
    });
  } else {
    res.status(404).send({
      msg: "Product Not Found.",
    });
  }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  console.log("POST: /products");
  console.log("req.body = ", req.body);
  const product = new productModel({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ msg: "New Product Created", data: newProduct });
  }
  return res.status(500).send({ msg: "Error in creating product" });
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  console.log("PUT: /products");
  console.log("req.body = ", req.body);
  const productId = req.params.id;
  const product = await productModel.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ msg: "Product Updated", data: updatedProduct });
    }
  }
  return res.status(500).send({ msg: "Error in updating product" });
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await productModel.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    return res.send({ msg: "Product Deleted" });
  }
  return res.send({ msg: "Error in Deleting Product" });
});

export default router;
