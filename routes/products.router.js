const express = require('express');
const ProductService = require('../services/product.service');
const router = express.Router();
const service = new ProductService();



router.get('/', (req, res) => {
  const products = service.find();
  res.json({
    total: products.length,
    message: 'Products found',
    data: products,
  });
});

/* router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
}); */

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);

  if (!product) {
    return res.status(404).send({
      message: 'Product not found',
    });
  }

  res.json({
    message: 'Product found',
    data: product,
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  const product = service.create(body);

  if (!product) {
    return res.status(400).send({
      message: 'Product not created',
    });
  }
  res.json({
    message: 'Product created',
    data: product,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json({
    message: 'Product updated',
    data: product,
  });
});

router.delete('/:id', (req, res) => {
  const productId = req.params.id;
  const productIndex = data.products.findIndex(
    (product) => product.id === parseInt(productId),
  );
  if (productIndex !== -1) {
    data.products.splice(productIndex, 1);
    // res.sendStatus(204);
    res.json({
      message: 'Product deleted',
      data: data.products,
    });
  } else {
    res.status(404).send('Product not found');
  }
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Product updated',
    data: {
      ...body,
    },
    id,
  });
});

/* router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const productIndex = data.products.findIndex(
    (product) => product.id === parseInt(id),
  );
  if (productIndex !== -1) {
    const product = data.products[productIndex];
    data.products[productIndex] = {
      ...product,
      ...body,
    };
    res.json(data.products[productIndex]);
  } else {
    res.status(404).send('Product not found');
  }
}); */

module.exports = router;
