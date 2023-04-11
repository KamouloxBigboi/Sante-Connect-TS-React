module.exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
module.exports.userBoard = (req, res) => {
res.status(200).send("User Content.");
};

module.exports.adminBoard = (req, res) => {
res.status(200).send("Admin Content.");
};

module.exports.moderatorBoard = (req, res) => {
res.status(200).send("Moderator Content.");
  };