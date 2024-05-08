var express = require("express");
const {
  addOrEditBotSettings,
  get,
  getCurrent,
  addTelegramId,
} = require("../controllers/botSettings");
const { auth } = require("../middleware/auth");
var router = express.Router();

router.post("/add", auth, addOrEditBotSettings);
router.get("/get", auth, get);
router.get("/get/:id", getCurrent);
router.put("/addTid", addTelegramId);

module.exports = router;
