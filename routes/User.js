const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");
const multer = require('multer');
const {
  loginRules,
  registerRules,
  validation,
} = require("../middleware/validator");

const isAuth = require("../middleware/passport");

//dfefinir un storage pour ajouter une image
const storage =multer.diskStorage({
  //destination de l'image
  destination:function(req,file,callback){
    callback(null,'./public');
  },
  filename:function(req,file,callback){
      callback(null,file.originalname) ;
  }
});

const upload=multer({
  storage: storage,
 
})



//@method POST
//@desc POST A USER
// @PATH  http://localhost:8999/register
// @Params  Body
// register
router.post("/register", upload.any('image'), controllers.register);



//@method POST
//@desc POST A USER
// @PATH  http://localhost:8999/login
// @Params  Body
// login
router.post("/login", loginRules(), validation, controllers.login);




//@method GET
//@desc GET A USER
// @PATH  http://localhost:8999/user/current
// @Params  Body
// get current user
router.get("/current", isAuth(), controllers.current);





//@method DELETE
//@desc delete one user by id
//@path : http://localhost:6500/admin/:id
//@Params id
router.delete("/admin/:id", controllers.DeleteOneUser);



//@method GET
//@desc get all user 
//@path : http://localhost:6500/admin/user
//@Params 
router.get("/admin/user",controllers.GetAllUser)


//@method PUT
//@desc update a profile by id
//@path : http://localhost:8999/profile/:id
//@Params id body
router.put("/profil/:id",upload.any('image'),controllers.UpdateUser)



//@method GET
//@desc getting user by id
//@path : http://localhost:8999/user/profil/:id
//@Params id body
router.get("/user/profil/:id",controllers.GetOneUser)

module.exports = router;
