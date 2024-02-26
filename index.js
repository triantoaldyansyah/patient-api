const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const mongo_uri=process.env.MONGO_URI;
mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schema and Models using Mongoose
const patientSchema = new mongoose.Schema({
  patientName: String,
  patientID: String,
  dateOfTreatment: Date,
  treatmentDescription: [String],
  medicationsPrescribed: [String],
  costOfTreatment: Number
});

const Patient = mongoose.model('Patient', patientSchema);

// Define API endpoints
app.post('/api/patients', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
