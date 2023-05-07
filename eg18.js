const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema for the data
const dataSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

// Create a model based on the schema
const Data = mongoose.model('Data', dataSchema);

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Route to create data
app.post('/data', (req, res) => {
  const { name, age, email } = req.body;
  const newData = new Data({ name, age, email });

  newData.save()
    .then(() => {
      res.send('Data created successfully');
    })
    .catch((error) => {
      res.status(500).send('Error creating data');
    });
});

// Route to read data
app.get('/data', (req, res) => {
  Data.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send('Error reading data');
    });
});

// Route to update data
app.put('/data/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;

  Data.findByIdAndUpdate(id, { name, age, email })
    .then(() => {
      res.send('Data updated successfully');
    })
    .catch((error) => {
      res.status(500).send('Error updating data');
    });
});

// Route to delete data
app.delete('/data/:id', (req, res) => {
  const { id } = req.params;

  Data.findByIdAndDelete(id)
    .then(() => {
      res.send('Data deleted successfully');
    })
    .catch((error) => {
      res.status(500).send('Error deleting data');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
