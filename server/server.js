// /server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

//passport connection
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URI
  },
  (accessToken, refreshToken, profile, done) => {
    // Save user information to your database
    // Here you can check if the user exists and create a new user if not
    return done(null, profile);
  }
));

passport.serializeUser ((user, done) => {
  done(null, user);
});

passport.deserializeUser ((user, done) => {
  done(null, user);
});

// Google authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(process.env.CALLBACK_URI, 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      // Successful authentication, redirect to your desired page.
      res.redirect(`${process.env.FRONTEND_URL}/users`); // Redirect to a user dashboard or profile page
    }
  );

// Use user routes
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});