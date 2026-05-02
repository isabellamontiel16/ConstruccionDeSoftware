const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let products = [
  { id: 1, name: "Laptop", price: 15000 },
  { id: 2, name: "Mouse", price: 300 },
];

app.get('/products', (req, res) => {
  res.json({ products });
});

app.post('/add_product', (req, res) => {
  const { id, name, price } = req.body;

  if (!id || !name || !price) {
    return res.status(400).json({ msg: "Missing fields" });
  }

  const newProduct = { id, name, price };
  products.push(newProduct);

  res.json({ msg: "Product added", product: newProduct });
});

app.get('/prepare_million_products', (req, res) => {
  products = [];

  for (let i = 1; i <= 100000; i++) {
    products.push({
      id: i,
      name: "Product " + i,
      price: Math.floor(Math.random() * 1000)
    });
  }

  res.send("OK");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});