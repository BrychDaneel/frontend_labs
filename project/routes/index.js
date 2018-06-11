let express = require("express");
let bodyParser = require('body-parser');
let controllers = require("../controllers");
let midlewares = require("../midlewares");
let auth = require("./auth");

let mainRoute = express.Router();
let  urlencodedParser = bodyParser.urlencoded({extended: false});

mainRoute.route("/").get(controllers.main);

mainRoute.use(auth.authRoute);

mainRoute.route("/basket").get(midlewares.auth, controllers.basket);
mainRoute.route("/basket/clear").get(midlewares.auth, controllers.basket_clear);
mainRoute.route("/basket/buy").get(midlewares.auth, controllers.basket_buy);
mainRoute.route("/good/:id").get(midlewares.find_good, controllers.good);
mainRoute.route("/good/:id/buy").get(
    midlewares.auth,
    midlewares.find_good,
    controllers.buy,
);

module.exports.mainRoute = mainRoute;
