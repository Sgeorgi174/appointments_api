const express = require("express");
const { login, register, getUser } = require("../controllers/users");
const { auth } = require("../middleware/auth");

const router = express.Router();

/* GET users listing. */
router.post("/login", login);

router.post("/register", register);

router.get("/:id", auth, getUser);

module.exports = router;
