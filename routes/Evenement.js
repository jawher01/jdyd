const express = require("express");
const router = express.Router();
const controllers=require("../controllers/Evenement");
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
//@desc post a evenement
//@path : http://localhost:8999/admin/evenement
//Params body
router.post("/", upload.any("image"), controllers.PostEvenement);


//@methode GET
//@desc GET all  evenement
//@path : http://localhost:8999/evenement
router.get("/",controllers.GetAllEvenement);

//@methode GET
//@desc GET one evenement
//@path : http://localhost:8999/evenement
//Parms id
router.get("/:id", controllers.GetOneEvenement);



//@method DELETE
//@desc delete one evenement by id
//@path : http://localhost:8999/evenement
//@Params id
router.delete("/:id", controllers.DeleteOneEvenement);

//@method PUT
//@desc update a evenement by id
//@path : http://localhost:8999/evenement
//@Params id body
router.put("/:id", upload.any("image"), controllers.UpdateEvenement);


router.patch("/participe/:id", controllers.ParticipeEven);
router.patch("/unparticipe/:id", controllers.unParticipe);

module.exports = router;