const express = require("express");
const { auth } = require("../middleware/auth");
const {
  generateSchedule,
  deleteSchedule,
  getSchedule,
  getCurrentSchedule,
} = require("../controllers/timetable");
const router = express.Router();

router.post("/generate", auth, generateSchedule);
router.delete("/delete", auth, deleteSchedule);
router.get("/get", auth, getSchedule);
router.get("/get/:userId", getCurrentSchedule);

module.exports = router;
