const express = require('express');
const productRouter  =  require('./products.router');
const userRouter  =  require('./users.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productRouter);
  router.use('/users', userRouter);

  /*const routerV2 = express.Router();
  app.use('/api/v2', routerV2);
  routerV2.use('/users', userRouter);*/
}

module.exports = routerApi;
