const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local');
const User = require('../models/UserModel');

passport.serializeUser((user, done) => {
  //saving user.id (mongoDb _id) into cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// ***** USE LOCAL STRATEGY *****
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      //password added to the query (needed to compare passwords)
      const user = await User.findOne({ username }).select('+password');
      if (!user) return done(null, false);

      const passwordMatch = await user.comparePassword(password);

      if (!passwordMatch) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       //URL to redirect user after they are granted access by Google
//       callbackURL: '/auth/google/callback',
//       //we need to trust Heroku's proxy (there was a http vs https callback path error)
//       proxy: true,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         //check if user exists
//         const existingUser = await User.findOne({ googleId: profile.id });
//         if (existingUser) {
//           //when finished => call done (1st argument is err)
//           return done(null, existingUser);
//         }
//         //saving user into the DB
//         const user = await new User({ googleId: profile.id }).save();
//         //user-> newly created user, we use this one -> reflecting possible changes while saving into DB
//         done(null, user);
//       } catch (error) {
//         console.log(error, 'could not fetch user from the DB');
//       }
//     }
//   )
// );
