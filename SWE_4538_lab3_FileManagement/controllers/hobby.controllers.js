const Hobby = require("../dataModels/Hobby.model");
const User = require("../dataModels/User.model");
const bcrypt = require("bcrypt");

const postHobby = async (req, res, next) => {
  const { email, hobbyname, description } = req.body;

  const errors = [];

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        const newHobby = new Hobby({
          userId: user._id,
          hobbyname,
          description,
        });

        newHobby
          .save()
          .then(() => {
            res
              .status(201)
              .json({ message: "Hobby saved successfully", hobby: newHobby });
          })
          .catch((err) => {
            errors.push("Failed to save the hobby");
            res.status(400).json({ error: errors });
          });
      } else {
        res.status(400).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      errors.push(err);
      res.status(500).json({ error: errors });
    });
};

const getHobbies = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const userHobbies = await Hobby.find({ userId });
    res.status(200).json(userHobbies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHobby = async (req, res, next) => {
  const hobbyId = req.params.hobbyId;
  const updatedData = req.body;

  try {
    const updatedHobby = await Hobby.findByIdAndUpdate(hobbyId, updatedData, {
      new: true,
    });

    if (!updatedHobby) {
      return res.status(404).json({ error: "Hobby not found" });
    }

    res.status(200).json(updatedHobby);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteHobby = async (req, res, next) => {
  const hobbyname = req.params.name;

  try {
    const deletedHobby = await Hobby.findOneAndDelete({ hobbyname });

    if (!deletedHobby) {
      return res.status(404).json({ error: "Hobby not found" });
    }

    res
      .status(200)
      .json({ message: "Hobby deleted successfully", deletedHobby });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadHobbyImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const userId = req.user.id;

    const hobby = await Hobby.findOne({ userId: userId });

    if (!hobby) {
      return res.status(404).json({ message: "Hobby not found for the user" });
    }

    const image = req.file.filename;

    if (image) {
      hobby.profile_image = image;
    }

    await hobby.save();

    res.json({ message: "Hobby image uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadHobbyAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const userId = req.user.id;

    const hobby = await Hobby.findOne({ userId: userId });

    if (!hobby) {
      return res.status(404).json({ message: "Hobby not found" });
    }

    const audio = req.file.filename;

    hobby.audio = audio;

    await hobby.save();

    res.json({ message: "Hobby audio uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadHobbyImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files provided" });
    }

    const userId = req.user.id;

    const hobby = await Hobby.findOne({ userId: userId });

    if (!hobby) {
      return res.status(404).json({ message: "Hobby not found for the user" });
    }

    const newImages = req.files.map((file) => file.filename);

    hobby.images.push(...newImages);

    await hobby.save();

    res.json({ message: "Hobby images uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadHobbyAudios = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files provided" });
    }

    const userId = req.user.id;

    const hobby = await Hobby.findOne({ userId: userId });

    if (!hobby) {
      return res.status(404).json({ message: "Hobby not found" });
    }

    const newAudios = req.files.map((file) => file.filename);

    hobby.audios.push(...newAudios);

    await hobby.save();

    res.json({ message: "Hobby audios uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHobbyImages = async (req, res) => {
  try {
    const userId = req.user.id;

    const hobbies = await Hobby.find({ userId });

    if (!hobbies || hobbies.length === 0) {
      return res.status(404).json({ message: "No hobbies found for the user" });
    }

    const hobbyData = hobbies.map((hobby) => {
      return {
        hobbyname: hobby.hobbyname,
        images: hobby.images,
        description: hobby.description,
      };
    });

    res.json({ hobbies: hobbyData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHobbyAudios = async (req, res) => {
  try {
    const userId = req.user.id;

    const hobbies = await Hobby.find({ userId });

    if (!hobbies || hobbies.length === 0) {
      return res.status(404).json({ message: "No hobbies found for the user" });
    }

    const hobbyData = hobbies.map((hobby) => {
      return {
        hobbyname: hobby.hobbyname,
        audios: hobby.audios,
        description: hobby.description,
      };
    });

    res.json({ hobbies: hobbyData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHobbyProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;

    const hobby = await Hobby.findOne({ userId });

    if (!hobby) {
      return res.status(404).json({ message: "Hobby not found for the user" });
    }

    const profileImage = hobby.profile_image;

    if (!profileImage) {
      return res
        .status(404)
        .json({ message: "No profile image found for the hobby" });
    }

    res.json({ profileImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHobbyImagesByHobbyName = async (req, res) => {
  try {
    const hobbyName = req.params.hobbyName;

    const hobby = await Hobby.findOne({ hobbyname: hobbyName });

    if (!hobby) {
      return res.status(404).json({ message: "Hobby not found" });
    }

    const images = hobby.images;

    if (!images || images.length === 0) {
      return res.status(404).json({ message: "No images found for the hobby" });
    }

    res.json({ images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHobbyAudioByHobbyName = async (req, res) => {
  try {
    const hobbyName = req.params.hobbyName;

    const hobby = await Hobby.findOne({ hobbyname: hobbyName });

    if (!hobby) {
      return res.status(404).json({ message: "Hobby not found" });
    }

    const audios = hobby.audios;

    if (!audios || audios.length === 0) {
      return res.status(404).json({ message: "No audios found for the hobby" });
    }

    res.json({ images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postHobby,
  getHobbies,
  updateHobby,
  deleteHobby,
  uploadHobbyImage,
  uploadHobbyAudio,
  uploadHobbyImages,
  getHobbyImages,
  uploadHobbyAudios,
  getHobbyAudios,
  getHobbyAudioByHobbyName,
  getHobbyImagesByHobbyName,
  getHobbyProfileImage,
};
