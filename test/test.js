var fs = require('fs'),
    assert = require('assert'),
    mongo = require('../mongo/mongo.js'),
    docs = [],
    collection = '';

before(function () {
    fs.readFile('test/data/photo-test.json', function (err, data) {
        if (err) throw err;
        docs.push(JSON.parse(data));
    });
    collection = 'photo-test';
    fields = { 'urlstore': 1, 'urlthumb':1 };
});

describe('Test Mongo', function () {
    it('should add new documents', function (done) {
        mongo.writeInDB(docs, collection, function (result) {
            assert.deepEqual(result['result']['ok'], 1);
            assert.deepEqual(result['result']['n'], 1);
            done();
        });
    });
    it('should list all documents in a collection with specific fields', function (done) {
        mongo.listFromDB(collection, fields, function (list) {
            assert.deepEqual(list[0]['urlstore'], 'http://photo.aptservizi.com/store/');
            assert.deepEqual(list[0]['urlthumb'], 'http://cdn1-odm.sviluppoaptservizi.com/odm/r,');
            assert.deepEqual(list[0]['version'], undefined);
            done();
        });
    });
});
