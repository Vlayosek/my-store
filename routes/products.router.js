const express = require("express");
const ProductsService = require("../services/product.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/product.schema");
const router = express.Router();

const service = new ProductsService();

router.get("/", async (req, res) => {
  const products = await service.find();
  res.json({
    data: products
  });
});

//Especifico antes que dinamico
router.get("/filter", async (req, res) => {
  res.send('Yo soy un filter')
});

router.get("/:id",
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
      res.json({
        data: product
      });
  } catch (error) {
    next(error);
  }
});

router.post("/",
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    data: newProduct
  });
});

router.patch("/:id",
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body  = req.body;

    const editProduct = await service.update(id, body);

    res.json({
      message: "Product updated",
      data: editProduct
    });
  } catch (error) {
    next(error);
  }

});

router.delete("/:id",
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const deletedProduct = await service.delete(id);

    res.json({
      message: "Product deleted",
      data: deletedProduct
    });
  } catch (error) {
    next(error);
  }

});

module.exports = router;

