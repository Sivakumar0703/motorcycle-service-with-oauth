import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { findOrCreateUser , findUser } from "../user.service.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
      // after converting the code from google to actual data
      // console.log("redirect callback")
      const user = await findOrCreateUser(profile);
      // console.log(profile.displayName, profile.emails[0].value, profile.id,user._id , profile.photos[0]?.value);
      return done(null, user);
      } catch (error) {
        console.log(error.message)
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
    console.log("cookie parser",user)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
});
