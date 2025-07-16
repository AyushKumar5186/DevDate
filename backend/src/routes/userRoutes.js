const express = require("express");
const { getProfile, updateProfile } = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);

module.exports = router;