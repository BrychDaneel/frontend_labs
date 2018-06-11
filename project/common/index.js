module.exports.getNextSequenceValue = function(name, f=()=>{}){
    let col = global.database.collection("sequences");
    col.findOneAndUpdate(
        {name: name},
        {$inc: {val: 1}},
        {},
        (err, result) => f(err, result.value.val)
    );
}
