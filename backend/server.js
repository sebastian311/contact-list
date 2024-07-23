const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite Database
const db = new sqlite3.Database('./contacts.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create Contacts Table
db.run(`CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  address TEXT,
  email TEXT,
  phone TEXT,
  cell TEXT,
  registrationDate TEXT,
  age INTEGER,
  image TEXT
)`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  }
});

// Routes

// Welcome Route
app.get('/', (req, res) => {
  res.send('Welcome to the Contacts API');
});

// Create a new contact
app.post('/contacts', (req, res) => {
  const { name, address, email, phone, cell, registrationDate, age, image } = req.body;
  db.run(`INSERT INTO contacts (name, address, email, phone, cell, registrationDate, age, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [name, address, email, phone, cell, registrationDate, age, image], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Get all contacts
app.get('/contacts', (req, res) => {
  db.all(`SELECT * FROM contacts`, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ contacts: rows });
  });
});

// Get a single contact by ID
app.get('/contacts/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM contacts WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ contact: row });
  });
});

// Update a contact by ID
app.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { name, address, email, phone, cell, registrationDate, age, image } = req.body;
  db.run(`UPDATE contacts SET name = ?, address = ?, email = ?, phone = ?, cell = ?, registrationDate = ?, age = ?, image = ? WHERE id = ?`, [name, address, email, phone, cell, registrationDate, age, image, id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: `Contact with ID ${id} updated.` });
  });
});

// Delete a contact by ID
app.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM contacts WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: `Contact with ID ${id} deleted.` });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
