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
});

describe('Test Mongo', function () {
    it('should add new documents', function (done) {
        mongo.writeInDB(docs, collection, function (result) {
            assert.deepEqual(result['result']['ok'], 1);
            assert.deepEqual(result['result']['n'], 1);
            done();
        });
    });
});
