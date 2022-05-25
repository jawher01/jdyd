const classe = require("../models/Classe");



//ajouter un class
exports.PostClasse = async (req, res) => {   
      const { nom, duree,  nb_heure,formation} = req.body;
            try {
                  const newClasse = new classe({nom, duree,  nb_heure,formation});
                  if (req.files.length > 0) {
                    req.files.map(file => {
                        newClasse.cours = "http://127.0.0.1:6500/cour/" +file.originalname
                    })
                  } else {
                        newClasse.cours = "http://127.0.0.1:6500/cour/default.pdf"
                  }
            const response = await newClasse.save();
            res.status(200).send({ response: response, message: "classe enregistrer" });
      } catch (error) {
            res.status(400).send({ message: "ne peut pas le sauvegarder" },console.log(error) );
      }
};

    
//GET all classes
exports.GetAllClasse = async (req, res) => {
      try {
            const result = await classe.find().populate("formation")
            res.send({ response: result, message: "avoir classe avec succès" });
      } catch (error) {
            res.status(400).send({ message: "ne peut pas obtenir classe" });
            console.log(error)
      }
};

//GET one classe
exports.GetOneClasse = async (req, res) => {
      try {
            const result = await classe.findOne({ _id: req.params.id }).populate("formation")
            res.send({ response: result, message: "avoir classe avec succès" });
      } catch (error) {
            res.status(400).send({ message: "il n'y a pas de classe avec cet identifiant" });
      }
};

//delete one classe by id
exports.DeleteOneClasse = async (req, res) => {
      try {
            const result = await classe.deleteOne({ _id: req.params.id })
            result
                  ? res.send({ message: "classe supprimé" })
                  : res.send({ message: "il n'y a pas de classe avec cet identifiant" });
      } catch (error) {
            res.status(400).send({ message: "il n'y a pas de classe avec cet identifiant" });
      }
};

//update a classe by id
exports.UpdateClasse = async (req, res) => {
      try {
            const result = await classe.updateOne(
                  { _id: req.params.id },
                  { $set: { ...req.body } })
            result.nModified ? 
                  res.send({ message: "classe mis à jour", user: req.body }) :
                  res.send({ message: "classe déjà mis à jour", user: req.body })
      } catch (error) {
            res.status(400).send({ message: "il n'y a pas de classe avec cet identifiant" });
      }
};