module.exports.register = function(request, response){
  response.render('register.hbs', request.context);
};

module.exports.register_post = function(request, response){
  if(!request.body)
      return response.sendStatus(400);

  let users = global.database.collection("users");

  let name = request.body.name;
  let password = request.body.password;
  let email = request.body.email;

  users.findOne({ $or: [{name: name}, {email: email}]}, function(err, user){
      if (err || user){
          request.context.exist = true;
          request.context.name = name;
          request.context.email = email;
          return response.render('register.hbs', request.context);
      }
      users.insertOne({
          name: name,
          password: password,
          email: email,
          basket: []
      });
      return response.redirect("/login");
  });
};

module.exports.login = function(request, response){
  response.render('login.hbs', request.context);
};

module.exports.logout = function(request, response){
  response.redirect("/");
};

module.exports.login_post = function(request, response){
  if(!request.body)
      return response.sendStatus(400);
  let name = request.body.name;
  let password = request.body.password;
  let users = global.database.collection("users");
  users.findOne({name: name, password: password}, function(err, user){
      if (!user || err){
          request.context.error = true;
          return response.render('login.hbs', request.context);
      }
      request.session.user_id = user._id.toString();
      request.session.user_name = user.name;
      response.redirect("/");
  });
};
