const express = require("express");
const router = express.Router();
const {
  postHobby,
  getHobbies,
  deleteHobby,
  updateHobby,
  uploadHobbyImage,
  uploadHobbyAudio,
  uploadHobbyImages,
  uploadHobbyAudios,
  getHobbyImages,
  getHobbyAudios,
  getHobbyProfileImage,
  getHobbyImagesByHobbyName,
  getHobbyAudioByHobbyName,
} = require("../controllers/hobby.controllers");

const {
  uploadProfileImage,
  uploadAudioFile,
} = require("../middlewares/image.middleware");

router.post("/postHobby", postHobby);
router.get("/gethobby/:userId/hobbies", getHobbies);
router.delete("/delete-hobby/:name", deleteHobby);
router.patch("/updatehobby/:hobbyId", updateHobby);
router.post(
  "/upload/hobby_image",
  uploadProfileImage.single("image"),
  uploadHobbyImage
);

router.post(
  "/upload/multiple_hobbyimage",
  uploadProfileImage.array("images", 5),
  uploadHobbyImages
);

router.post("/upload/audio", uploadAudioFile.single("audio"), uploadHobbyAudio);
router.post(
  "/upload/audio",
  uploadAudioFile.array("audios", 5),
  uploadHobbyAudios
);

router.get("/multiple_hobbyimage", getHobbyImages);
router.get("/multiple_hobbyaudios", getHobbyAudios);
router.get("/hobbyprofileimage", getHobbyProfileImage);

router.get("/hobbyimagebyname/:hobbyName", getHobbyImagesByHobbyName);
router.get("/hobbyaudiobyname/:hobbyName", getHobbyAudioByHobbyName);

module.exports = router;
