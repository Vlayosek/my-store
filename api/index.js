const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const routerApi = require("./routes");

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();

const whiteList = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
      // callback(new Error('no permitido'));
    } else {
      // callback(null, true);
      callback(new Error('no permitido'));
    }
  }
}
// app.use(morgan('dev'));
const port = process.env.PORT || 3000;


app.use(cors( options ));
app.use(express.json());

/*const whitelist = ['http://localhost:8080', 'https://my-store-gamma-six.vercel.app'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(cors(options));*/

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

/*app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api", (req, res) => {
  res.send("Hello mi server en express!");
});*/

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
