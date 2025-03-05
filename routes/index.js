const express = require('express');
const productRouter  =  require('./products.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  // app.use('/api/v1/products', productRouter);
  router.use('/products', productRouter);
}

module.exports = routerApi;
