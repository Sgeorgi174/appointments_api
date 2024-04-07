const express = require("express");
const {
  addService,
  getServices,
  editService,
  deleteService,
} = require("../controllers/services");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/add", auth, addService);
router.get("/get", auth, getServices);
router.put("/edit", auth, editService);
router.put("/delete", auth, deleteService);

module.exports = router;
