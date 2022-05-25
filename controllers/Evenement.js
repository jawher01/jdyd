const evenement = require("../models/Evenement");
const ObjectID = require("mongoose").Types.ObjectId;

//post a evenement
exports.PostEvenement = async (req, res) => {
      try {
            const newEvenement = new evenement({ ...req.body });
                  if (req.files.length > 0) {
                    req.files.map((file) => {
                        newEvenement.img =
                        "http://127.0.0.1:6500/public/" + file.originalname;
                    });
                  } else {
                        newEvenement.img = "http://127.0.0.1:6500/public/default.png";
                  }
            const response = await newEvenement.save();
            res.send({ response: response, message: "evenement enregistrer" });
      } catch (error) {
            res.status(404).send({ message: "ne peut pas le sauvegarder" }, error);
      }
};

//GET all evenement
exports.GetAllEvenement= async (req, res) => {
      try {
            const result = await evenement.find()
          
            res.send({ response: result, message: "avoir evenements avec succès" });
           
      } catch (error) {
            res.status(400).send({ message: "ne peut pas obtenir l'evenements" });
      }
};

//GET one evenement
exports.GetOneEvenement = async (req, res) => {
      try {
            const result = await evenement.findOne({ _id: req.params.id })
            res.send({ response: result, message: "avoir evenement avec succès" });
      } catch (error) {
            res.status(400).send({ message: "il n'y a pas de evenement avec cet identifiant" });
      }
};

//delete one evenement by id
exports.DeleteOneEvenement= async (req, res) => {

      try {
            const result = await evenement.deleteOne({ _id: req.params.id })
            result
                  ? res.send({ message: "classe supprimé" })
                  : res.send({ message: "il n'y a pas des evenements avec cet identifiant" });

      } catch (error) {
            res.status(400).send({ message: "il n'y a pas des evenements avec cet identifiant" });
      }
};

//update a evenement by id
exports.UpdateEvenement = async (req, res) => {
      
      try {
            const eve = { ...req.body };
            if (req.files.length > 0) {
              req.files.map((file) => {
                  eve.img = "http://127.0.0.1:6500/public/" + file.originalname;
              });
            }
            const result = await evenement.updateOne(
                  { _id: req.params.id },
                  { $set: { ...eve} },
                )
            result.nModified ?
                  res.send({ message: "evenement mis à jour", user: req.body }) :
                  res.send({ message: "evenement déjà mis à jour", user: req.body })
      } catch (error) {
            res.status(400).send({ message: "il n'y a pas des evenements avec cet identifiant" });
      }
};

//post like
exports.ParticipeEven = async (req, res) => {
      if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    
      await evenement
        .findByIdAndUpdate(
          { _id: req.params.id },
          {
            $addToSet: { participant: req.body.id },
          },
          { new: true }
        )
        .then(function (err) {
          if (!err) {
            res.status(200).send("participe avec suucces");
          } else {
            throw err;
          }
        })
        .catch(function (err) {
          console.log(err);
          res.status(400).send(err);
        });
    };
    
    //post unlike
    exports.unParticipe = async (req, res) => {
      if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    
      await evenement
        .findByIdAndUpdate(
          req.params.id,
          {
            $pull: { participant: req.body.id },
          },
          { new: true }
        )
        .then(function (err) {
          if (!err) {
            res.status(200).send("unParticipe avec suucces");
          } else {
            throw err;
          }
        })
        .catch(function (err) {
          console.log(err);
          res.status(400).send(err);
        });
    };