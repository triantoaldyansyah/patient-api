const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  patientId: {
    type: String,
    required: true
  },
  dateOfTreatment: {
    type: Date,
    required: true
  },
  treatmentDescription: {
    type: [String],
    required: true
  },
  medicationsPrescribed: {
    type: [String],
    required: true
  },
  costOfTreatment: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Patient', patientSchema);
