const express = require("express");
const { auth } = require("../middleware/auth");
const {
  generateSchedule,
  deleteSchedule,
  getSchedule,
} = require("../controllers/timetable");
const router = express.Router();

router.get("/generate", auth, generateSchedule);
router.delete("/delete", auth, deleteSchedule);
router.get("/get", auth, getSchedule);
router.get("/getDay");

module.exports = router;
