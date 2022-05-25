const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Formation");
const multer = require("multer");

//dfefinir un storage pour ajouter une image
const storage = multer.diskStorage({
  //destination de l'image
  destination: function (req, file, callback) {
    callback(null, "./public");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

//@POST method
//@desc post a formation
//@path : http://localhost:8999/formation
router.post("/", upload.any("image"), controllers.PostFormation);

//@methode GET
//@desc GET all  formation
//@path : http://localhost:8999/formation
router.get("/", controllers.GetAllFormation);

//@methode GET
//@desc GET one formation
//@path : http://localhost:8999/formation
//Parms id
router.get("/:id", controllers.GetOneFormation);

//@method DELETE
//@desc delete one formation by id
//@path : http://localhost:8999/formation/id
//@Params id
router.delete("/:id", controllers.DeleteOneFormation);

//@method PUT
//@desc update a formation by id
//@path : http://localhost:8999/formation/id
//@Params id body
router.put("/:id", upload.any("image"), controllers.UpdateFormation);

module.exports = router;
