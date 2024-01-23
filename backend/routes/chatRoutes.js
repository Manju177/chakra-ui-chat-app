const express=require("express");
const router=express.router();
const {protect}=require("../middleware/authMiddlrware");

// router.route('/').post(protect,accessChat);
// router.route('/').get(protect,fetchChats);
// router.route("/group").post(protect,createGroupChat)
// router.route("/renameGroup").post(protect,renameGroup);
// router.route("/removegroup").post(protect,renameGroup);
// router.route("/addgroup").post(protect,addToGroup);

module.exports=router