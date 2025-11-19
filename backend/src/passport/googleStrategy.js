// Authentication framework for Node.js
import passport from "passport";
// Google OAuth 2.0 authentication strategy
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

// Register Google OAuth strategy in Passport
passport.use(
  // Create new instance of Google Strategy
  new GoogleStrategy(
    {
      // Unique Client ID from Google Developer Console
      clientID: process.env.GOOGLE_CLIENT_ID,
      // Client Secret from Google Developer Console
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Redirect URL after authorization
      callbackURL: "/api/auth/google/callback",
    },

    // Verification callback function executes after successful Google auth
    async (accessToken, refreshToken, profile, done) => {
      // accessToken: User token for accsess API Google
      // refreshToken: refresher token for accsessToken (could be undefined)
      // profile: User profile object
      // done: callback function for completing authentication
      try {
        // Try to find existing user in db
        let user = await User.findOne({ googleId: profile.id });

        // If user not found
        if (!user) {
          // Create new user in db
          user = await User.create({
            // name: full username from Google profile object
            name: profile.displayName,
            // email: first email from Google profile object with optional chaining
            email: profile.emails?.[0]?.value,
            // googleId: unique googleId
            googleId: profile.id,
            // avatarUrl: first picture from Google profile object with optional chaining
            avatarUrl: profile.photos?.[0]?.value,
          });
        }

        // Authentication successful - pass user to Passport
        done(null, user);
      } catch (err) {
        // Authentication failed - pass error to Passport
        done(err, null);
      }
    }
  )
);
