module.exports = function(request, response){
    let col = global.database.collection("goods");

    goods = col.find().toArray(function(err, goods){
        request.context.goods = goods;
        response.render("main.hbs", request.context);
    });
};
