const express=require('express');
const {registerUser,authUser}=require('../controllers/user.controllers');

const router=express.Router()

router.post("/",registerUser)
router.post('/login',authUser);

module.exports=router;