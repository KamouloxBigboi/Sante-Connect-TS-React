const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// Fonction email valide (regex)

let validateEmail = function(email) {
  const re = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm
    return re.test(email);
};

const UserSchema = new mongoose.Schema({

    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [false, "Pour l'inscription, votre adresse email est requise"],
      validate: [validateEmail, " Merci d'inscrire un email valide "],
      match: [/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm]
  },

    password: {
      type: String,
      required: [true, "Tapez votre mot de passe"]
  },
   
    age: {
      type: Number,
      required: [true, "Pour l'inscription sur cette appli, il faut avoir 16 ans et plus"],
      min: 16
  },

    gender: String,

    occupation: String,

    country: {
      type: String,
      required: true
  },

    roles: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ],
});


const User = mongoose.model("users", UserSchema);

module.exports = User;