let mongoose = require('mongoose');
let csv = require('fast-csv');

/**
 * importFile : Peuple la bdd depuis un .txt
 * @param  {String} filePath:  chemin du fichier .txt
 * @param  {String} modelName: nom du model (mongoDB)
 * @return {Nothing}
 */
module.exports.importFile = function(filePath, modelName) {
    let count = 0;
    csv
    .fromPath(filePath)
    .on('data', function(data) {
        if(data[0]!=null && count<500){
            console.log(data);
            let Obj = mongoose.model(modelName);
            let obj = new Obj({id:count, name: data[0]});

            let promise = obj.save();

            count++;
        }
    })
    .on('end', function() {
        console.log("done");
    });
}