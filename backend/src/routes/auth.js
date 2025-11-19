import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Initiate Google OAuth authentication flow /api/auth/google
router.get(
  "/google",
  // Use Google strategy configured in Passport
  passport.authenticate("google", {
    // scope: Defines what user data we request from Google
    scope: ["profile", "email"],
  })
);

// Handle Google OAuth callback after user authenticates /api/auth/google/callback
router.get(
  "/google/callback",
  // Passport authenticates using Google strategy
  passport.authenticate("google", {
    // Disable session storage, we'll use JWT instead
    session: false,
  }),
  //   Custom callback handler after successful authentication
  (req, res) => {
    // Passport has successfully authenticated the user, req.user contains the user object
    // Create JWT token for the authenticated user
    const token = jwt.sign(
      {
        // Payload: include user ID in the token
        userId: req.user._id,
      },
      // Secret key to sign the token
      process.env.JWT_SECRET,
      {
        // Token expiration time: 7 days
        expiresIn: "7d",
      }
    );
    // Redirect user back to frontend with the token
    res.redirect(`${process.env.FRONTEND_URL}/login-success?token=${token}`);
  }
);

export default router;
