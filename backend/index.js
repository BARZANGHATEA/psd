const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// initialize sqlite database
const db = new sqlite3.Database('db.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      price REAL,
      file_path TEXT
  )`);
});

const SECRET = 'mysecret';

function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: 'No token' });
  const token = header.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

const upload = multer({ dest: 'uploads/' });

// register
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], function(err) {
    if (err) return res.status(400).json({ message: 'User exists' });
    res.json({ id: this.lastID, username });
  });
});

// login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

// list products
app.get('/api/products', (req, res) => {
  db.all('SELECT id, title, description, price FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(rows);
  });
});

// product details
app.get('/api/products/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err || !row) return res.status(404).json({ message: 'Not found' });
    res.json(row);
  });
});

// add product (admin placeholder)
app.post('/api/products', authMiddleware, upload.single('file'), (req, res) => {
  const { title, description, price } = req.body;
  const filePath = req.file ? req.file.path : null;
  db.run('INSERT INTO products (title, description, price, file_path) VALUES (?, ?, ?, ?)',
    [title, description, price, filePath], function(err) {
      if (err) return res.status(500).json({ message: 'DB error' });
      res.json({ id: this.lastID });
    });
});

app.listen(3001, () => console.log('API running on port 3001')); 
