const express = require("express");
const routerApi = require("./routes");
const app = express();
const port = 3000;


app.use(express.json());
routerApi(app);



const data = {

  products: [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      image: "https://via.placeholder.com/150",
    },
  ],
  users: [
    {
      id: 1,
      name: "John Doe",
    },
    {
      id: 2,
      name: "Jane Doe",
    },
  ],
}


app.use((req, res, next) => {
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

app.get("/", (req, res) => {
  res.send("Hello mi server en express!");
});



app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = data.users.find(user => user.id === parseInt(userId));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});




app.post("/users", (req, res) => {
  const newUser = req.body;
  data.users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const userIndex = data.users.findIndex(user => user.id === parseInt(userId));
  if (userIndex !== -1) {
    data.users[userIndex] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).send("User not found");
  }
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const userIndex = data.users.findIndex(user => user.id === parseInt(userId));
  if (userIndex !== -1) {
    data.users.splice(userIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send("User not found");
  }
});


app.get('/users' , (req, res) => {
  const {limit, offset} = req.query;
  if(!limit || !offset) {
    return res.status(400).send('Limit and offset are required');
  }
  res.json({
    limit,
    offset
  })
});

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
