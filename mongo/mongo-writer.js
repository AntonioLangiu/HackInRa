var  fs = require('fs');
var mongo = require('./mongo.js');
var resources = {};

fs.readFile('mongo-conf.json', function (err, data) {
    if (err) throw err;
    resources = JSON.parse(data);
    prepareData();
});

var prepareData = function () {
    for (var i in resources['resources']) {
        writeCollectionInDB(resources['resources'][i]);
    }
}

var writeCollectionInDB = function (collection) {
    var path = collection['path'],
        name = collection['name'],
        iterator = collection['iterator'],
        fields = collection['fields'],
        enabled = collection['enabled'];

    if (!enabled) return;

    fs.readFile(path, function (err, data) {
        if (err) throw err;
        var docs = JSON.parse(data)[iterator];
        mongo.writeInDB(docs, name, function (result) {
            console.log(docs.length);
            console.log(name + " written in DB");
        });
    });
}
