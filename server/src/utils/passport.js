const passport = require("passport");
const authModal = require("../models/auth.model");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const isProd = process.env.NODE_ENV === "production";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: !isProd
        ? "http://localhost:5000/api/auth/google/callback"
        : `${process.env.FRONTEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await authModal.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await authModal.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });
        } else if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
