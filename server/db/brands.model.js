// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const BrandsSchema = new Schema({
  name: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Brands", BrandsSchema);
