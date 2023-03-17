const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = "/.netlify/functions/netlifyAPI" || 5000;
const serverless = require('serverless-http');


// Enable cross-origin resource sharing for all requests
app.use(cors());

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Connect to the SQLite database
const db = new sqlite3.Database('settings.db', { verbose: true }, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the settings database.');
  }
});

// Get all settings
app.get('/api/settings', (req, res) => {
  const sql = 'SELECT * FROM settings';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.send(rows);
    }
  });
});

// Create a new setting
app.post('/api/settings', (req, res) => {
  const { totalLength, totalWidth, radarPosition, numRoads, roadWidth } = req.body;
  const sql = 'INSERT INTO settings (total_length, total_width, radar_position, num_roads, road_width) VALUES (?, ?, ?, ?, ?)';
  const values = [totalLength, totalWidth, radarPosition, numRoads, roadWidth];

  db.run(sql, values, function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send({ message: 'Internal server error' });
    } else {
      res.send({ message: 'Setting created', id: this.lastID });
    }
  });
});

// Update an existing setting
app.put('/api/settings/:id', (req, res) => {
  const id = req.params.id;
  const { totalLength, totalWidth, radarPosition, numRoads, roadWidth } = req.body;
  const sql = 'UPDATE settings SET total_length = ?, total_width = ?, radar_position = ?, num_roads = ?, road_width = ? WHERE id = ?';
  const values = [totalLength, totalWidth, radarPosition, numRoads, roadWidth, id];

  db.run(sql, values, function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send({ message: 'Internal server error' });
    } else if (this.changes === 0) {
      res.status(404).send({ message: `Setting with ID ${id} not found` });
    } else {
      res.send({ message: 'Setting updated', id: id });
    }
  });
});

// Delete an existing setting
app.delete('/api/settings/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM settings WHERE id = ?';

  db.run(sql, id, function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send({ message: 'Internal server error' });
    } else if (this.changes === 0) {
      res.status(404).send({ message: `Setting with ID ${id} not found` });
    } else {
      res.send({ message: 'Setting deleted' });
    }
    });
});

app.use(port, ()=>{
  console.log('API server started on ${port}');
});
module.exports.handler = serverless(app);

// Start the server
// app.listen(port, () => {
// console.log(`Server is listening on port ${port}`);
// });
