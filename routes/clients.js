const express = require("express");
const { addClient } = require("../controllers/clients");
var router = express.Router();

router.post("/add", addClient);

module.exports = router;
