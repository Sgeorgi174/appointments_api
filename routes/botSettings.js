var express = require("express");
const { add, get } = require("../controllers/botSettings");
const { auth } = require("../middleware/auth");
var router = express.Router();

router.post("/add", auth, add);
router.get("/:id", get);
router.put("/edit");

module.exports = router;
