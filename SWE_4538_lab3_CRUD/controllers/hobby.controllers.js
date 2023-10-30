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

module.exports = {
  postHobby,
  getHobbies,
  updateHobby,
  deleteHobby,
};
