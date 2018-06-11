module.exports.requestLog = function(request, response, next){
    console.log(`${request.method}: ${request.url}`);
    next();
};

module.exports.logout = function(request, response, next){
    request.session.regenerate(()=>next());
};

module.exports.auth = function(request, response, next){
    if(!request.session.user_id)
        response.redirect('/login');
    else
        next();
};

module.exports.createContext = function(request, response, next){
    request.context = {};
    next();
};

module.exports.addUser = function(request, response, next){
    request.context.user = request.session.user_name;
    next();
};

module.exports.find_good = function(request, response, next){
  let goods = global.database.collection("goods");
  let id = Number(request.params["id"]);
  goods.findOne({"id": id}, function(err, good){
      if (err || !good)
          return response.sendStatus(404);
      request.good = good;
      next();
  });
};

module.exports.use = function(app){
    app.use(module.exports.createContext);
    app.use(module.exports.addUser);
};
