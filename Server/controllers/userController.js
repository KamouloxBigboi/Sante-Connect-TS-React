module.exports.allAccess = (req, res) => {
  res.status(200).send("all");
  };
  
module.exports.userBoard = (req, res) => {
  res.status(200).send("user");
};

module.exports.moderatorBoard = (req, res) => {
  res.status(200).send("mod");
  };

module.exports.adminBoard = (req, res) => {
  res.status(200).send("admin");
};
