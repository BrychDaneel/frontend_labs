let express = require("express");
let session = require('express-session')
let hbs = require("hbs");
let settings = require("./settings");
let routes = require("./routes");
let helpers = require("./helpers");
let mongodb = require("mongodb");
let midlewares = require("./midlewares");
let MongoDBStore = require('connect-mongodb-session')(session);

app = express();

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerPartials(__dirname + "/views/partials/components");

app.use(midlewares.requestLog);

var sessionStore = new MongoDBStore(
{
    uri: settings.DB_URL,
    databaseName: settings.DB_NAME,
    collection: settings.SESSION_COLLECTION,
});

app.use(session({
  secret : settings.SESSION_KEY,
  cookie: { maxAge: settings.SESSION_LENGTH },
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
}));

app.use('/static', express.static(__dirname + "/static"));

midlewares.use(app);

app.use("/", routes.mainRoute);

helpers.register();

let MongoClient = mongodb.MongoClient;
MongoClient.connect(
    settings.DB_URL,
    { auto_reconnect: true },
    function (err, client){
        if (err)
          throw err;
        global.database = client.db(settings.DB_NAME);
        console.log(`INFO: Conected to database ${settings.DB_URL}`);

        app.listen(settings.SERVER_PORT, function(){
            console.log(`INFO: Started listen on ${settings.SERVER_PORT}`);
    });
});
