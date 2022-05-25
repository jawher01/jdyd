const employer = require("../models/Employer");



//ajouter un employer
exports.PostEmployer = async (req, res) => {
      try {
            const newEmployer = new employer({ ...req.body });
            const response = await newEmployer.save();
            res.send({ response: response, message: "employer enregistrer" });
      } catch (error) {
            res.status(404).send({ message: "ne peut pas le sauvegarder" }, error);
      }
};

//GET all employers
exports.GetAllEmployer = async (req, res) => {
      try {
            const result = await employer.find()
            res.send({ response: result, message: "avoir employer avec succès" });
      } catch (error) {
            res.status(400).send({ message: "ne peut pas obtenir employer" });
            console.log(error)
      }
};

//GET one employer
exports.GetOneEmployer = async (req, res) => {
      try {
            const result = await employer.findOne({ _id: req.params.id })
            res.send({ response: result, message: "avoir employer avec succès" });
      } catch (error) {
            res.status(400).send({ message: "il n'y a pas de employer avec cet identifiant" });
      }
};

//delete one employer by id
exports.DeleteOneEmployer = async (req, res) => {

      try {
            const result = await employer.deleteOne({ _id: req.params.id })
            result
                  ? res.send({ message: "employer supprimé" })
                  : res.send({ message: "il n'y a pas de employer avec cet identifiant" });

      } catch (error) {
            res.status(400).send({ message: "il n'y a pas de employer avec cet identifiant" });
      }
};

//update a employer by id
exports.UpdateEmployer = async (req, res) => {
      try {
            const result = await employer.updateOne(
                  { _id: req.params.id },
                  { $set: { ...req.body } })
            result.nModified ?
                  res.send({ message: "employer mis à jour"}) :
                  res.send({ message: "employer déjà mis à jour" })
      } catch (error) {
            res.status(400).send({ message: "il n'y a pas de employer avec cet identifiant" });
      }
};