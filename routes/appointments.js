var express = require("express");
const {
  addAppointment,
  deleteAppointment,
  getAllAppointments,
  confirmAppointment,
} = require("../controllers/appointments");
const { auth } = require("../middleware/auth");
var router = express.Router();

router.post("/add", addAppointment);
router.delete("/delete", auth, deleteAppointment);
router.put("/confirm", auth, confirmAppointment);
router.get("/get", auth, getAllAppointments);

module.exports = router;
