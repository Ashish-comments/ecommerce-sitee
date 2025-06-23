const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

let db = require('./db.json');

app.get('/api/products', (req, res) => {
  res.json(db.products);
});

app.get('/api/products/:id', (req, res) => {
  const product = db.products.find(p => p.id == req.params.id);
  res.json(product);
});

app.post('/api/register', (req, res) => {
  db.users.push(req.body);
  fs.writeFileSync('./backend/db.json', JSON.stringify(db, null, 2));
  res.json({ success: true });
});

app.post('/api/login', (req, res) => {
  const user = db.users.find(u => u.email === req.body.email && u.password === req.body.password);
  res.json(user ? { success: true } : { success: false });
});

app.post('/api/order', (req, res) => {
  db.orders.push(req.body);
  fs.writeFileSync('./backend/db.json', JSON.stringify(db, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
