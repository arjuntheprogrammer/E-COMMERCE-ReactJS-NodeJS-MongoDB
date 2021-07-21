import express from "express";
import data from "./data";

const app = express();
app.get("/api/products", (req, res) => {
  console.log("GET /api/products");
  res.send(data.products);
});

app.listen(5000, () => {
  console.log("Server Started at http://localhos:5000");
});
