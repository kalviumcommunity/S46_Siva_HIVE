const passport = require("passport");
const UserModel = require("../Model/userModel");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/bee/user/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let email = profile.emails ? profile.emails[0].value : null;

        let user = await UserModel.findOne({ googleId: profile.id });

        if (!user) {
          user = new UserModel({
            email: email,
            username: profile.displayName,
            googleId: profile.id,
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user data into the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user data from the session
passport.deserializeUser(async function (id, done) {
  try {
    const user = await UserModel.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;