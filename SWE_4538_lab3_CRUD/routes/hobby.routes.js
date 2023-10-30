const express = require("express");
const router = express.Router();
const {
  postHobby,
  getHobbies,
  deleteHobby,
  updateHobby,
} = require("../controllers/hobby.controllers");

router.post("/postHobby", postHobby);
router.get("/gethobby/:userId/hobbies", getHobbies);
router.delete("/delete-hobby/:name", deleteHobby);
router.patch("/updatehobby/:hobbyId", updateHobby);

module.exports = router;
