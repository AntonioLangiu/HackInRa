var assert = require('assert');
var client = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/scoprira-db";

var writeInDB = function (docs, name, cb) {
    client.connect(url, function (err, db) {
        if (err) throw err;
        var collection = db.collection(name);
        collection.insertMany(docs, {w:1}, function (err, result) {
            if (err) throw err;
            db.close();
            cb(result);
        });
    });
}

var listFromDB = function (name, fields, cb) {
    client.connect(url, function (err, db) {
        if (err) throw err;
        var collection = db.collection(name);
        collection.find({}, fields).toArray(function (err, docs) {
            if (err) throw err;
            db.close();
            cb(docs);
        });
    });
}

exports.writeInDB = writeInDB;
exports.listFromDB = listFromDB;
