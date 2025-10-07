const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  checkAuth,
  forgotPassword,
  resetPassword,
  updateProfile,
} = require("../controllers/auth.controller");
const { validationResult } = require("express-validator");
const signUpValidation = require("../middleware/validation/signUpValidation");
const signInValidation = require("../middleware/validation/signInValidation");
const {
  verifyToken,
  verifyRefreshToken,
} = require("../middleware/verifyToken");
const resetPasswordValidation = require("../middleware/validation/resetPassValidation");
const updateProfileValidation = require("../middleware/validation/updateProfileValidation");
const passport = require("passport");
const googleSignIn = require("../controllers/googleAuth.controller");
const {
  signupAndSignInLimiter,
  verifyEmailLimiter,
} = require("../middleware/rateLimit");
const forgotValidation = require("../middleware/validation/forgotValidation");
const router = express.Router();

router.post(
  "/sign-up",
  signupAndSignInLimiter,
  signUpValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    signUp(req, res, next);
  }
);

router.post(
  "/sign-in",
  signupAndSignInLimiter,
  signInValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    signIn(req, res, next);
  }
);

router.post("/sign-out", signOut);
router.get("/check-auth", verifyToken, checkAuth);

router.post(
  "/forgot-password",
  forgotValidation,
  verifyEmailLimiter,
  forgotPassword
);
router.post("/reset-password/:token", resetPasswordValidation, resetPassword);

router.put(
  "/update-profile",
  updateProfileValidation,
  verifyToken,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    updateProfile(req, res, next);
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/sign-in",
  }),
  (req, res) => {
    // User is authenticated here
    const userId = req.userId;

    // Generate JWT / Refresh token
    generateToken(res, userId);
    generateRefreshToken(res, userId);

    // Redirect to frontend after login
    const frontendUrl = isProd
      ? "https://insights-k5t9.onrender.com/home"
      : "http://localhost:5173/home";

    return res.redirect(frontendUrl);
  }
);
router.post("/refresh-token", verifyRefreshToken);

module.exports = router;
