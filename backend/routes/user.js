import express from "express";
import passport from "passport";
import db from "../database/user.js";

function isLoggedIn(req, res, next) { 
  if (req.isAuthenticated()) 
    return next(); 
  res.redirect('/login'); 
} 

const router = express.Router();

/* GET home page. */ 
router.get('/', function(req, res, next) { 
  res.json({ title: 'Home' });
}); 

// GET Login
router.get('/login', function(req, res, next) { 
  res.json({ title: 'Login' });
}); 
// POST Login 
router.post('/login', passport.authenticate('local-login', { 
  successRedirect : '/profile', 
  failureRedirect : '/login', 
})); 

// GET Signup
router.get('/signup', function(req, res) { 
  res.json({ title: 'Sign Up' });
}); 
// POST Signup
router.post('/signup', passport.authenticate('local-signup', { 
  successRedirect : '/profile', 
  failureRedirect : '/signup', 
})); 

// GET Profile page
router.get('/profile', isLoggedIn, function(req, res, next) { 
  res.json({ title: 'Profile (protected)' });
}); 

/* GET Logout Page */ 
router.get('/logout', function(req, res) { 
  req.logout(); 
  res.json({ message: "Logout successful" });
  res.redirect('/'); 
}); 

// // Google OAuth2 authentication routes
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/error" }),
//   (req, res) => {
//     res.redirect("/success");
//   }
// );

export default router;
