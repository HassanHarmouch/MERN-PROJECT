const express = require('express');
const router = express.Router();
const passport = require('passport');

// Google Authentication Routes
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/login');
});

module.exports = router;
