let mongoose = require('mongoose');
let csv = require('fast-csv');
let YandexTranslator = require('yandex.translate');
let translator = new YandexTranslator('trnsl.1.1.20170402T081420Z.2b7b666f5e9db90b.e1e03408d5658285e063dcf21e63166e63122ba0');

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}
/**
 * importFile : Peuple la bdd depuis un .txt
 * @param  {String} filePath:  chemin du fichier .txt
 * @param  {String} modelName: nom du model (mongoDB)
 * @return {Nothing}
 */
module.exports.importFile = function(filePath, modelName) {
   let nbWordInDb = 0;
   let nbWordToTranslate = 0;
   let wordFr = '';
   let WORDSFR = [];
   csv
   .fromPath(filePath)
   .on('data', function(data) {
      wordFr = data[0];

      if(wordFr!=null && nbWordToTranslate<1000){

         WORDSFR.push(wordFr);
         nbWordToTranslate++;
      }
   })
   .on('end', function() {
      translator.translate(WORDSFR, 'fr-en').then(function(response){
         for (var i = 0; i < WORDSFR.length; i++) {
            // si le résultat traduit est le même que le mot français
            // on considère qu'il est "mal traduit" par l'API
            // on ne l'enregistre pas dans la BDD
            if(WORDSFR[i] != response[i]){
               console.log("+ "+WORDSFR[i]);
               let Obj = mongoose.model(modelName);
               let obj = new Obj({id:nbWordInDb, name: WORDSFR[i]});
               obj.save();
               nbWordInDb++;
            }else{
               console.log('mauvaise correction de "'+WORDSFR[i]+'"');
            }
            // si le nombre de mot dans la bdd a atteind 500 on arrête
            if (nbWordInDb>=500) break;
         }
         console.log("done");
      });
   });
}