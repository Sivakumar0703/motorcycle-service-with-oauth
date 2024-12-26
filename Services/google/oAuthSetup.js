import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { findOrCreateUser , findUser } from "../user.service.js";
import {Strategy as GithubStrategy } from "passport-github2"

// google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log("access token",accessToken)
        console.log("refresh token",refreshToken)
      // after converting the code from google to actual data
      const user = await findOrCreateUser(profile , 'googleId');
      // console.log(profile.displayName, profile.emails[0].value, profile.id,user._id , profile.photos[0]?.value);
      return done(null, user);
      } catch (error) {
        console.log(error.message)
        done(error.message);
      }
    }
  )
);

// github
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user' , 'user:email']
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
      const user = await findOrCreateUser(profile , 'githubId');
      return done(null, user);
      } catch (error) {
        console.log('github strategy',error.message)
        done(error.message);
      }
    }
  )
);


// after the done(callback) is called from GoogleStrategy
// serialize
passport.serializeUser((user, done) => done(null, user._id));

// cookie from browser
// deserialize
passport.deserializeUser(async(id, done) => {
  try {
    const user = await findUser(id);
    done(null, user)
  } catch (error) {
    done(error, null)
  }
});
