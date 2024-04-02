var express = require("express");
const { add, get } = require("../controllers/botSettings");
const { auth } = require("../middleware/auth");
const { startTelegramBot } = require("../controllers/startBot");
var router = express.Router();

router.post("/add", auth, add);
router.get("/:id", get);
router.put("/edit");
router.get("/start/:id", auth, startTelegramBot);

module.exports = router;
