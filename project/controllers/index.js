let mongodb = require("mongodb");
let auth = require("./auth");

module.exports.main = require("./main");

module.exports.register = auth.register;
module.exports.register_post = auth.register_post;
module.exports.login = auth.login;
module.exports.login_post = auth.login_post;
module.exports.logout = auth.logout;

function convertGoods(idArray, f, goodArray=[]){
    if (!idArray.length)
        return f(undefined, goodArray);

    let id = idArray.shift();
    let goods = global.database.collection("goods");
    goods.findOne({id: id}, function(err, good){
        if (err)
            f(err, undefined);
        goodArray.push(good);
        convertGoods(idArray, f, goodArray);
    });
}

module.exports.basket = function(request, response){
  let id = mongodb.ObjectId(request.session.user_id);
  let users = global.database.collection("users");
  users.findOne({_id: id}, function(err, user){
      let idArray = user.basket.slice();
      convertGoods(idArray, function(err, basket){
          let total = basket.reduce((sum, g)=>g.price+sum, 0)
          request.context.basket = basket;
          request.context.basket.total = total;
          response.render("basket.hbs", request.context);
      });
  });
};

module.exports.good = function(request, response){
    request.context.good = request.good;
    response.render('good.hbs', request.context);
};

module.exports.buy = function(request, response){
  let id = mongodb.ObjectId(request.session.user_id);
  let good_id = Number(request.params.id);

  let users = global.database.collection("users");
  users.findOne({_id: id}, (err, user)=>console.log(user));
  users.updateOne({_id: id}, {$push: {basket: good_id}}, function(err, user){
      if (!user)
          return response.sendStatus(404);

      return response.redirect("/basket");
  });
};

module.exports.basket_clear = function(request, response){
    let id = mongodb.ObjectId(request.session.user_id);
    let users = global.database.collection("users");
    users.updateOne({_id: id}, {$set: {basket: []}}, function(){
        return response.redirect("/basket");
    });
}

module.exports.basket_buy = function(request, response){
    let id = mongodb.ObjectId(request.session.user_id);
    let users = global.database.collection("users");
    let orders = global.database.collection("orders");
    users.findOne({_id: id}, function(err, user){
        let basket = user.basket;
        orders.insertOne({user: id, basket: basket}, function(){
            users.updateOne({_id: id}, {$set: {basket: []}}, function(){
                return response.redirect("/basket");
            });
        });
    });
}
