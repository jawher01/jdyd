const formation = require("../models/Formation");

//post a formation
exports.PostFormation = async (req, res) => {
  try {
    const newFormation = new formation({ ...req.body });
    if (req.files.length > 0) {
      req.files.map((file) => {
        newFormation.img =
          "http://127.0.0.1:6500/public/" + file.originalname;
      });
    } else {
      newFormation.img = "http://127.0.0.1:6500/public/default.png";
    }
    const response = await newFormation.save();
    res
      .status(200)
      .send({ response: response, message: "formation enregistrer" });
  } catch (error) {
    res.status(400).send({ message: "ne peut pas le sauvegarder" }, error);
  }
};

//GET all formation
exports.GetAllFormation = async (req, res) => {
  try {
    const result = await formation.find().populate("etudiant").populate("proffeseur");
    res.send({ response: result, message: "avoir formation avec succès" });
  } catch (error) {
    res.status(400).send({ message: "ne peut pas obtenir le formation" });
  }
};

//GET one formation
exports.GetOneFormation = async (req, res) => {
  try {
    const result = await formation.findOne({ _id: req.params.id }).populate("etudiant").populate("proffeseur");
    res.send({ response: result, message: "avoir formation avec succès" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "il n'y a pas de formation avec cet identifiant" });
  }
};

//delete one formation by id
exports.DeleteOneFormation = async (req, res) => {
  try {
    const result = await formation.deleteOne({ _id: req.params.id });
    result
      ? res.send({ message: "formation supprimé" })
      : res.send({
          message: "il n'y a pas des formations avec cet identifiant",
        });
  } catch (error) {
    res
      .status(400)
      .send({ message: "il n'y a pas des formations avec cet identifiant" });
  }
};

//update a formation by id
exports.UpdateFormation = async (req, res) => {
  try {
    const form = { ...req.body };
    if (req.files.length > 0) {
      req.files.map((file) => {
        form.img = "http://127.0.0.1:6500/public/" + file.originalname;
      });
    }
    const result = await formation.updateOne(
      { _id: req.params.id },
      { $set: { ...form } }
    );
    result.nModified
      ? res.send({ message: "formation mis à jour", user: req.body })
      : res.send({ message: "formation déjà mis à jour", user: req.body });
  } catch (error) {
    res
      .status(400)
      .send({ message: "il n'y a pas des formation avec cet identifiant" });
  }
};
