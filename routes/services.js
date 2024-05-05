const express = require("express");
const {
  addService,
  editService,
  deleteService,
} = require("../controllers/services");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/add", auth, addService);
router.put("/edit", auth, editService);
router.delete("/delete", auth, deleteService);

module.exports = router;
