const db = require('../models');
const User = db.user;
const Role = db.user;
const config = require('../config/authConfig');
const jwt = require("jsonwebtoken");

// Fonction qui vérifie si l'utilisateur est toujours connecté

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "Aucun token reçu!" });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Opération non autorisée!" });
      }
      req.userId = decoded.id;
      next();
    });
  };
  
  isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Erreur : nécessite le rôle d'administrateur!" });
          return;
        }
      );
    });
  };
  
  isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Erreur : nécessite le rôle de modérateur " });
          return;
        }
      );
    });
  };
  
  const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
  };
  module.exports = authJwt;