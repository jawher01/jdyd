const publication = require("../models/Publication");
const ObjectID = require("mongoose").Types.ObjectId;

//post a publication
exports.Postpublication = async (req, res) => {
  try {
    const newPublication = new publication({ ...req.body });
    if (req.files.length > 0) {
      req.files.map((file) => {
        newPublication.img =
          "http://127.0.0.1:6500/public/" + file.originalname;
      });
    } else {
      newPublication.img = "http://127.0.0.1:6500/public/default.png";
    }
    const response = await newPublication.save();
    res
      .status(200)
      .send({ response: response, message: "publication enregistrer" });
  } catch (error) {
    res.status(400).send({ message: "ne peut pas le sauvegarder" }, error);
  }
};

//GET all publication
exports.GetAllPublication = async (req, res) => {
  try {
    const result = await publication
      .find()
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    res.send({ response: result, message: "avoir publication avec succès" });
  } catch (error) {
    res.status(400).send({ message: "ne peut pas obtenir le publication" });
  }
};

//GET one publication
exports.GetOnePublication = async (req, res) => {
  try {
    const result = await publication
      .findOne({ _id: req.params.id })
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    res.send({ response: result, message: "avoir publication avec succès" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "il n'y a pas de publication avec cet identifiant" });
  }
};

//delete one publication by id
exports.DeleteOnePublication = async (req, res) => {
  try {
    const result = await publication.deleteOne({ _id: req.params.id });
    result
      ? res.send({ message: "publication supprimé" })
      : res.send({
          message: "il n'y a pas de publication avec cet identifiant",
        });
  } catch (error) {
    res
      .status(400)
      .send({ message: "il n'y a pas de publication avec cet identifiant" });
  }
};

//update a publication by id
exports.UpdatePublication = async (req, res) => {
  try {
    const pub = { ...req.body };
    if (req.files.length > 0) {
      req.files.map((file) => {
        pub.img = "http://127.0.0.1:6500/public/" + file.originalname;
      });
    }
    const result = await publication.updateOne(
      { _id: req.params.id },
      { $set: { ...pub } }
    );
    result.nModified
      ? res.send({ message: "publication mis à jour", user: req.body })
      : res.send({ message: "publication déjà mis à jour", user: req.body });
  } catch (error) {
    res
      .status(400)
      .send({ message: "il n'y a pas de publication avec cet identifiant" });
  }
};

//post like
exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  await publication
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }
    )
    .then(function (err) {
      if (!err) {
        res.status(200).send("likes avec suucces");
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
exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  await publication
    .findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
    )
    .then(function (err) {
      if (!err) {
        res.status(200).send("unlikes avec suucces");
      } else {
        throw err;
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(400).send(err);
    });
};
