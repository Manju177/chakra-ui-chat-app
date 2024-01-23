const express=require('express');
const {registerUser,authUser,allUsers}=require('../controllers/user.controllers');
const {protect}=require("../middleware/authMiddlrware")

const router=express.Router()

router.route("/").post(registerUser).get(protect,allUsers);
router.post('/login',authUser);

module.exports=router;