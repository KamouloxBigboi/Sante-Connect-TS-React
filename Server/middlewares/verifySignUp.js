const db = require("../models");
const User = db.user;
const ROLES = db.ROLES;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Erreur! Compte déjà existant avec ce nom d'utilisateur!" });
      return;
    }

    User.findOne({
    email: req.body.email
    }).exec((err, user) => {
    if (err) {
        res.status(500).send({ message: err });
        return;
    }

    if (user) {
        res.status(400).send({ message: "Compte déjà existant avec cet Email !" });
        return;
    }

    next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: `Erreur! Le statut de ${req.body.roles[i]} n'existe pas!`
          });
          return;
        }
      }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
  };
  
module.exports = verifySignUp;