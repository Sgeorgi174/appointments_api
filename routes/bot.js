const express = require("express");
const { auth } = require("../middleware/auth");
const { startBot, stopBot } = require("../controllers/bot");

const router = express.Router();

router.get("/start", auth, startBot);
router.get("/stop", auth, stopBot);

module.exports = router;
