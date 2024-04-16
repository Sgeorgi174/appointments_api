var express = require("express");
const { add, get, edit, getCurrent } = require("../controllers/botSettings");
const { auth } = require("../middleware/auth");
const upload = require("../middleware/upload");
var router = express.Router();

router.post(
  "/add",
  auth,
  upload.fields([
    { name: "addressFile" },
    { name: "greetingFile" },
    { name: "notificationFile" },
  ]),
  add
);
router.get("/get", auth, get);
router.get("/get/:id", getCurrent);
router.put(
  "/edit",
  auth,
  upload.fields([
    { name: "addressFile" },
    { name: "greetingFile" },
    { name: "notificationFile" },
  ]),
  edit
);

module.exports = router;
