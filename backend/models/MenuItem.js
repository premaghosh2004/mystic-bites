const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: String, // optional: a default image can be set if not provided
  category: {
    type: String,
    required: true,
    enum: ["starter", "main", "dessert", "drink"]
  },
  isSpicy: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Menu", menuSchema);


