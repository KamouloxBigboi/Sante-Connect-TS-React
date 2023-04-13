const mongoose = require("mongoose");

const Role = mongoose.model(
  "roles",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Role;
