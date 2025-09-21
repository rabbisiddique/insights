const app = require("express");
const { verifyToken, verifyMagicLink } = require("../middleware/verifyToken");
const sendMagicLink = require("../controllers/magicLink.controller");
const { verifyEmailLimiter } = require("../middleware/rateLimit");

const router = app.Router();

router.post("/send-magic-link", verifyEmailLimiter, verifyToken, sendMagicLink);
router.get("/verify-email/:token", verifyMagicLink);

module.exports = router;
