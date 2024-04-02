var express = require("express");
const {
  addAppointment,
  createCalendar,
  getToday,
  getTomorrow,
} = require("../controllers/appointments");
var router = express.Router();

router.post("/add", addAppointment);
router.post("/createCalendar", createCalendar);
router.get("/getToday", getToday);
router.post("/getTomorrow", getTomorrow);

module.exports = router;
