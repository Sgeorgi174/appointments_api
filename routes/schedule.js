const express = require("express");
const { auth } = require("../middleware/auth");
const {
  addDays,
  deleteDays,
  getAllDays,
  getAvailableSlots,
} = require("../controllers/schedule");
const router = express.Router();

router.post("/add", auth, addDays);
router.delete("/delete", auth, deleteDays);
router.get("/get", auth, getAllDays);
router.post("/getTimes", getAvailableSlots);

module.exports = router;
