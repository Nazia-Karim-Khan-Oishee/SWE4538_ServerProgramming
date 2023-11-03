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
  profile_image: {
    type: String,
    default: "",
  },
  images: {
    type: [String],
    default: [],
  },
  audio: {
    type: String,
    default: "",
  },
  audios: {
    type: [String],
    default: [],
  },
});

const Hobby = mongoose.model("Hobby", HobbySchema);
module.exports = Hobby;
