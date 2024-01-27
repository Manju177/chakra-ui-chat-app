const express=require("express");
const router=express.Router();
const {protect}=require("../middleware/authMiddlrware");
const { accessChat,fetchChats,createGroupChat,renameGroup, addToGroup,removeGroup } = require("../controllers/chatControllers");

router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchChats);
router.route("/group").post(protect,createGroupChat);
router.route("/renameGroup").post(protect,renameGroup);
router.route("/removegroup").post(protect,removeGroup);
router.route("/addgroup").post(protect,addToGroup);

module.exports=router;