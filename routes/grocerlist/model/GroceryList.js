const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
    grocery: {
    type: String,
    required: true
  },
  purchased: {
    type: Boolean,
    default: false,
  },
  Date: {
    type: Date,
    default: () => Date.now(),
  },
  priority:{
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("grocery", grocerySchema);

