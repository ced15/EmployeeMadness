// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Equipment"
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
