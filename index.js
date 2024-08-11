const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
require('dotenv').config();

app.use(cors({origin:'*'}));
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

//'banner_db'

db.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('MySQL connected...');
  }
});

// Get banner data
app.get('/api/banner', (req, res) => {
  db.query('SELECT * FROM banner WHERE id = 1', (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

// Update banner data
app.post('/api/banner', (req, res) => {
  const { description, timer, link, visible } = req.body;
  db.query(
    'UPDATE banner SET description = ?, timer = ?, link = ?, visible = ? WHERE id = 1',
    [description, timer, link, visible],
    (err, result) => {
      if (err) throw err;
      res.send({ success: true });
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
