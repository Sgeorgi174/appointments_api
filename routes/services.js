const express = require("express");
const {
  addService,
  getServices,
  editService,
  deleteService,
  getCurrentServices,
} = require("../controllers/services");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/add", auth, addService);
router.get("/get", auth, getServices);
router.get("/get/:userId", getCurrentServices);
router.put("/edit", auth, editService);
router.put("/delete", auth, deleteService);

module.exports = router;
