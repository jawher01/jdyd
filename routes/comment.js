const express = require("express");
const router = express.Router();
const controllers=require("../controllers/comment");

//post comment
router.post("/", controllers.Postcomment);

module.exports = router;

