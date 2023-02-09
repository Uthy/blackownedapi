const express = require("express");
const router = express.Router();
const account = require("../controllers/account");

router.post("/login", account.login);

module.exports = router;
