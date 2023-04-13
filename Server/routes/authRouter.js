const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/authController");

module.exports = function(app) {

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/register",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ], (req, res) => {
      controller.register(req, res)
    });
    
    app.post("/api/auth/login", (req, res) => {
      controller.login(req, res)
  });
};
