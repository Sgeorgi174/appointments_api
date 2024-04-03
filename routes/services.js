const express = require("express");
const { add } = require("../controllers/services");
const router = express.Router();

router.post("/add", add);

module.exports = router;
