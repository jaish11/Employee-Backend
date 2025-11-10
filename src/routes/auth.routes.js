const express = require("express");
const router = express.Router();
const {
  signupController,
  loginController,
  refreshAccessTokenController,
} = require("../controllers/auth.controller");

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/refresh", refreshAccessTokenController);

module.exports = router;
