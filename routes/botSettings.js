var express = require("express");
const { add, get, edit } = require("../controllers/botSettings");
const { auth } = require("../middleware/auth");
const upload = require("../middleware/upload");
var router = express.Router();

router.post("/add", auth, upload.single("file"), add);
router.get("/get", auth, get);
router.put("/edit", auth, upload.single("file"), edit);

module.exports = router;
