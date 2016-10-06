var fs = require('fs'),
    assert = require('assert'),
    mongo = require('../mongo/mongo.js');
    docs = [],
    collection = '',
    fields = {},
    key = {};

before(function () {
    fs.readFile('test/data/photo-test.json', function (err, data) {
        if (err) throw err;
        var items = JSON.parse(data)["items"];
        for (var i in items) {
            docs.push(items[i]);
        }
    });
    collection = 'photo-test';
    fields = {'id': 1, 'autore': 1, 'linkorig': 1};
    key = {'id': '1071'};
});

describe('Test Mongo', function () {
    it('should add new documents', function (done) {
        mongo.writeInDB(docs, collection, function (result) {
            assert.deepEqual(result['result']['ok'], 1);
            assert.deepEqual(result['result']['n'], 2);
            done();
        });
    });
    it('should list all documents in a collection with specific fields', function (done) {
        mongo.listFromDB(collection, fields, function (list) {
            assert.deepEqual(list[0]['autore'], 'Pascual gargiulo');
            assert.deepEqual(list[0]['linkorig'], 'https://commons.wikimedia.org/wiki/File:Piazza_del_Popolo_e_Residenza_Comunale_-_039014204-MIBAC_-.JPG');
            assert.deepEqual(list[0]['soggetto'], undefined);
            done();
        });
    });
    it('should return specific fields of a defined document', function (done) {
        mongo.getDoc(collection, fields, key, function (item) {
            assert.deepEqual(item['autore'], 'Federfabbri');
            done();
        });
    });
});
