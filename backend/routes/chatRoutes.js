const express=require("express");
const router=express.Router();
const {protect}=require("../middleware/authMiddlrware");
const { accessChat,fetchChats,createGroupChat,renameGroup, addToGroup,removeFromGroup } = require("../controllers/chatControllers");

router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchChats);
router.route("/group").post(protect,createGroupChat);
router.route("/renameGroup").put(protect,renameGroup);
router.route("/removegroup").put(protect,removeFromGroup);
router.route("/addgroup").put(protect,addToGroup);

module.exports=router;