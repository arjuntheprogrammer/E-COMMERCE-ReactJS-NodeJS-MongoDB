import express from "express";
import data from "./data";
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";

dotenv.config();

const mongodbURL = config.MONGODB_URL;
mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRoute);

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
  console.log("Server Started at http://localhost:5000");
});
