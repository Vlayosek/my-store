const express = require("express");
const router = express.Router();

const data = {
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

router.get('/users' , (req, res) => {
  const {limit, offset} = req.query;
  if(!limit || !offset) {
    return res.status(400).send('Limit and offset are required');
  }
  res.json({
    limit,
    offset
  })
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const user = data.users.find(user => user.id === parseInt(userId));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

router.post("/", (req, res) => {
  const newUser = req.body;
  data.users.push(newUser);
  res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const userIndex = data.users.findIndex(user => user.id === parseInt(userId));
  if (userIndex !== -1) {
    data.users.splice(userIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send("User not found");
  }
});

module.exports = router;
