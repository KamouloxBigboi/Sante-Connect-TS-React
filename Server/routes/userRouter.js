
const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/content/all", controller.allAccess);

  app.get("/api/content/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/content/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/conten/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};