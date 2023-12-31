// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
  },
  brands: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brands",
  },
  colors: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Colors",
  },
  present: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
