const { check, validationResult } = require("express-validator");
//zeyda
// validation register
exports.registerRules = () => [
  check("nom", "nom is required").notEmpty(),
  check("prenom", "prenom is required").notEmpty(),
  check("email", "email is required").notEmpty(),
  check("email", "check email again").isEmail(),
  check("role", "role is required").notEmpty(),
  check("password", "password is required").isLength({
    min: 6,
    max: 20,
  }),
];

// validation login
exports.loginRules = () => [
  check("email", "email is required").notEmpty(),
  check("email", "check email again").isEmail(),
  check(
    "password",
    "password must be between 6 character and 20 character"
  ).isLength({
    min: 6,
    max: 20,
  }),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((el) => ({
        msg: el.msg,
      })),
    });
  }
  next();
};
