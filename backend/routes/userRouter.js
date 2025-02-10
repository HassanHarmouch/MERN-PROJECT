const express= require('express')
const router=express.Router();
const {signup,login,logout} = require('../controllers/userController');
const {authenticate}= require('../middlewares/authMiddleware')

router.post('/signup', signup); // This maps POST /signup to the signup function
router.post('/auth/login', login); // This maps POST /login to the login function
router.post('/logout', logout); // This maps POST /logout to the logout function


 
module.exports = router; 