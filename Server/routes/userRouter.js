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

    app.get("/api/content/all", (req, res) => {
        controller.allAccess(req, res);
    });

    app.get("/api/content/user", [authJwt.verifyToken], (req, res) => {
        controller.userBoard(req, res);
    });

    app.get("/api/content/mod", [authJwt.verifyToken, authJwt.isModerator], (req, res) => {
        controller.moderatorBoard(req, res);
    });

    app.get("/api/content/admin", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
        controller.adminBoard(req, res);
    });
};
