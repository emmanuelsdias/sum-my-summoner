import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../secrets/googleCreds.js";

export const localStrategySetup = (passport) => {
  passport.use(new LocalStrategy(User.authenticate())); // Change authentication to something elaborate later on
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};

export const googleStrategySetup = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "https://localhost:3001/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOrCreate({ googleId: profile.id }, (err, user) => {
          return done(err, user);
        });
      }
    )
  );
};
