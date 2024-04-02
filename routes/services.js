const express = require("express");
const { add } = require("../controllers/services");
var router = express.Router();

router.post("/add", add);

module.exports = router;
