const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/get", auth);
router.post("/add", auth);

module.exports = router;
