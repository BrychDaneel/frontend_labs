let hbs = require("hbs");

function toPrice(price){
    return price.toFixed(2) + "$";
}

module.exports.register = function(){
    hbs.registerHelper("toPrice", toPrice);
}
