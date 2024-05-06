const express = require("express");
const { auth } = require("../middleware/auth");
const {
  addOrEditContactsInfo,
  getContacts,
} = require("../controllers/contacts");
const router = express.Router();

router.post("/add", auth, addOrEditContactsInfo);
router.get("/get", auth, getContacts);

module.exports = router;
