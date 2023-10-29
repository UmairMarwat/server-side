const express = require("express");
const mongoose = require("mongoose");
const { config } = require("dotenv");
const cors = require("cors");
const ProductModel = require("./models/product");

config();

const app = express();

const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.post("/createProducts", (req, res) => {
//   ProductModel.create(req, res)
//     .then((products) => res.json(products))
//     .catch((err) => res.json(err));
// });
app.post("/createProducts", (req, res) => {
  ProductModel.create(req.body)
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

app.get("/", (req, res) => {
  ProductModel.find({})
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

app.get("/getProducts/:id", (req, res) => {
  const id = req.params.id;
  ProductModel.findById({ _id: id })
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

// app.put("/updateProducts/:id", (req, res) => {
//   const id = req.params.id;
//   ProductModel.findByIdAndUpdate(
//     { _id: id },
//     {
//       product: req.body.product,
//       quantity: req.body.quantity,
//       price: req.body.price,
//     }
//       .then((products) => res.json(products))
//       .catch((err) => res.json(err))
//   );
// });

app.put("/updateProducts/:id", (req, res) => {
  const id = req.params.id;
  ProductModel.findByIdAndUpdate(
    { _id: id },
    {
      product: req.body.product,
      quantity: req.body.quantity,
      price: req.body.price,
    }
  )
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

app.delete("/deleteProduct/:id", (req, res) => {
  const id = req.params.id;
  ProductModel.findByIdAndDelete({ _id: id })
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});
// app.delete("/deleteProduct/:id", (req, res) => {
//   const id = req.params.id;
//   ProductModel.findByIdAndDelete(id)
//     .then((product) => {
//       if (!product) {
//         return res.status(404).json({ error: "Product not found" });
//       }
//       res.json({ message: "Product deleted successfully" });
//     })
//     .catch((err) => res.status(500).json(err));
// });

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    app.listen(port);

    console.log("Server Created and DB Connected!!");
  })
  .catch(() => {
    console.log("NOT connected");
  });
