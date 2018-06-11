let express = require("express");
let bodyParser = require('body-parser');
let controllers = require("../controllers");
let midlewares = require("../midlewares");

let  urlencodedParser = bodyParser.urlencoded({extended: false});

let authRoute = express.Router();

authRoute.route("/register").get(midlewares.logout, controllers.register);
authRoute.route("/register").post(
    midlewares.logout,
    urlencodedParser,
    controllers.register_post
);
authRoute.route("/login").get(midlewares.logout, controllers.login);
authRoute.route("/login").post(
    midlewares.logout,
    urlencodedParser,
    controllers.login_post
);
authRoute.route("/logout").get(midlewares.logout, controllers.logout);

module.exports.authRoute = authRoute
