var express = require("express");
const {
  addAppointment,
  createCalendar,
  getToday,
  getTomorrow,
  getTime,
} = require("../controllers/appointments");
var router = express.Router();

router.post("/add", addAppointment);
router.post("/createCalendar", createCalendar);
router.get("/getToday", getToday);
router.post("/getTomorrow", getTomorrow);
router.get("/getTime", getTime);

module.exports = router;
