const express= require('express')
const router=express.Router();
const {getBundles}= require ('../controllers/bundleController');

router.get("/", getBundles);


 
module.exports = router; 