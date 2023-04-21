const config = require("../config/authConfig");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports.register = (req, res) => {
  const user = new User({username: req.body.username,
                         email: req.body.email,
                         password: bcrypt.hashSync(req.body.password, 8),
                         age: req.body.age,
                         country: req.body.country
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.status(200).json({message: "Utilisateur enregistré" })
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "L''utilisateur a été enregistré avec succès!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "L'utilisateur a été enregistré avec succès!" });
        });
      });
    }
  });
};

module.exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .populate("roles", "-__v")
    .exec()
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non reconnu" });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe non valide"
        });
      }

      const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });

      const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err });
    });
};
