const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { nom, prenom, email, password,role ,forma,salaire} = req.body;
  try {
    const newUser = new User({ nom, prenom, email, password,role,forma,salaire});
    if (req.files.length > 0) {
      req.files.map(file => {
        newUser.receipt = "http://127.0.0.1:6500/public/" + file.originalname
      })
    } else {
      newUser.receipt = "http://127.0.0.1:6500/public/default.png"
    }
    //   check if the email exist
    const searchedUser = await User.findOne({ email });

    if (searchedUser) {
      return res.status(400).send({ msg: "email existe déjà" });
    }
    // hash password
    const salt = 10;
    const genSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, genSalt);
   
    newUser.password = hashedPassword;

    // save the user
    const newUserToken = await newUser.save();
    // generate a token
    const payload = {
      _id: newUserToken._id,
      name: newUserToken.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });
    res.status(200).send({
      user: newUserToken,
      msg: "user is saved",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "impossible de sauvegarder l'utilisateur" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //   find if the user exist
    const searchedUser = await User.findOne({ email });
    // if thhe email not exist
    if (!searchedUser) {
      return res.status(400).send({ msg: "mauvais identifiant" });
    }
    // password are equals
    const match = await bcrypt.compare(password, searchedUser.password);

    if (!match) {
      return res.status(400).send({ msg: "mauvais identifiant" });
    }
    // generate a token
    const payload = {
      _id: searchedUser._id,
      name: searchedUser.name,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });
    // send the user
    res
      .status(200)
      .send({ user: searchedUser, msg: "success", token: `Bearer ${token}` });
  } catch (error) {
    res.status(400).send({ msg: "ne peut pas obtenir l'utilisateur" });
  }
};

exports.current = (req, res) => {
  res.status(200).send({ user: req.user });
};


exports.DeleteOneUser= async (req, res) => {
  try {
        const result = await User.deleteOne({ _id: req.params.id })
        result
              ? res.send({ message: "utilisateur supprimé" })
              : res.send({ message: "il n'y a pas d'utilisateur avec cet identifiant" });

  } catch (error) {
        res.status(400).send({ message: "il n'y a pas d'utilisateur avec cet identifiant" });

  }
};


//get all user
exports.GetAllUser = async (req,res)=>{
  try {
    const result = await User.find().populate("forma").populate("publication")
    res.status(200).send({ response: result, message: "obtenir utilisateur avec succes" });
} catch (error) {
    res.status(400).send({ message: "ne peut pas obtenir l'utilisateur" });
}
};

//update a user by id
exports.UpdateUser= async (req, res) => {
  try {
    const user={...req.body}
    if (req.files.length > 0) {
      req.files.map(file => {
        user.receipt = "http://127.0.0.1:6500/public/" + file.originalname
      })
    }
        const result = await User.updateOne(
              { _id: req.params.id },
              { $set: { ...user } })
        result.nModified ?
              res.send({ message: "profile mis à jour" }) :
              res.send({ message: "profile déjà mis à jour"})
  } catch (error) {
        res.status(400).send({message:"il n'y a pas de profil"});
  }
};


//GET one User
exports.GetOneUser = async (req, res) => {
  try {
        const result = await User.findOne({ _id: req.params.id }).populate("forma").populate("publication")
        res.send({ response: result, message: "obtenir l'utilisateur avec succès" });
  } catch (error) {
        res.status(400).send({ message: "il n'y a pas de user avec cet identifiant" });
  }
};






