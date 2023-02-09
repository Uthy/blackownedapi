const express = require("express");
const router = express.Router();
const account = require("../controllers/account");

router.post("/signup", account.signup);

module.exports = router;
