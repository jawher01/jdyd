const express = require("express");
const router = express.Router();
const controllers=require("../controllers/Publication");
const multer = require('multer');



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


//@POST method
//@desc post a publication
//@path : http://localhost:8999/user/publication
//Params body
router.post("/", upload.any('image'), controllers.Postpublication);


//@methode GET
//@desc GET all publication
//@path : http://localhost:8999/user/publication
router.get("/",controllers.GetAllPublication );

//@methode GET
//@desc GET one publication
//@path : http://localhost:8999/user/publication/id
//Parms id
router.get("/:id", controllers.GetOnePublication);



//@method DELETE
//@desc delete one publication by id
//@path : http://localhost:8999/user/publication/id
//@Params id
router.delete("/:id", controllers.DeleteOnePublication);

//@method PUT
//@desc update a publication by id
//@path : http://localhost:8999/user/publication
//@Params id body
router.put("/:id", upload.any('image'), controllers.UpdatePublication);



router.patch("/likepost/:id", controllers.likePost);
router.patch("/unlikepost/:id", controllers.unlikePost);

module.exports = router;

