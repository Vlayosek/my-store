
const express = require("express");
const { faker } = require("@faker-js/faker");

const router = express.Router();

router.get("/", (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.commerce.productName(),
      price: faker.number.int({ min: 100, max: 1000 }),
      image: faker.image.url()
    });
  }
  res.json(products);
});

router.get("/filter", (req, res) => {
  res.send('Yo soy un filter')
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = data.products.find(product => product.id === parseInt(id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);

  const newProduct = {
    id: faker.number.int({ min: 1, max: 100 }),
    ...body
  }
  res.status(201).json({
    message: "Product created",
    data: newProduct
  });
});


router.put("/:id", (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  const productIndex = data.products.findIndex(product => product.id === parseInt(productId));
  if (productIndex !== -1) {
    data.products[productIndex] = updatedProduct;
    res.json(updatedProduct);
  } else {
    res.status(404).send("Product not found");
  }
});

router.delete("/:id", (req, res) => {
  const productId = req.params.id;
  const productIndex = data.products.findIndex(product => product.id === parseInt(productId));
  if (productIndex !== -1) {
    data.products.splice(productIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send("Product not found");
  }
});


module.exports = router;

