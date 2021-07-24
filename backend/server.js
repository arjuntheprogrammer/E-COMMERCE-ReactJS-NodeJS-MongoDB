import express from "express";
import data from "./data";

const app = express();

app.get("/api/products", (req, res) => {
  console.log("GET /api/products");
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  console.log("GET /api/products/:id");
  const productId = req.params.id;
  console.log("productId: ", productId);
  const product = data.products.find((x) => x._id === productId);
  console.log("product: ", product);
  if (product) res.send(product);
  else res.status(404).send({ msg: "Product Not Found" });
});

app.listen(5000, () => {
  console.log("Server Started at http://localhos:5000");
});
