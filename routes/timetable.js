const express = require("express");
const { auth } = require("../middleware/auth");
const {
  generateSchedule,
  deleteSchedule,
  getSchedule,
  getCurrentSchedule,
  changeHour,
  changeDay,
} = require("../controllers/timetable");
const router = express.Router();

router.post("/generate", auth, generateSchedule);
router.delete("/delete", auth, deleteSchedule);
router.get("/get", auth, getSchedule);
router.get("/get/:userId", getCurrentSchedule);
router.put("/changeHour", auth, changeHour);
router.put("/changeDay", auth, changeDay);

module.exports = router;
