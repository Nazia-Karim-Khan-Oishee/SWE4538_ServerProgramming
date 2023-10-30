const mongoose = require("mongoose");

const HobbySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  hobbyname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Hobby = mongoose.model("Hobby", HobbySchema);
module.exports = Hobby;
