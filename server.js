var express = require('express');
var query = require('./query.js');
var apicache = require('apicache').options({ debug: true }).middleware;
var querystring = require('querystring');
var port = process.env.VCAP_APP_PORT || 8080;
var oneDay = 86400000;
var app = express();
var cors = require("cors");

app.use(cors());

app.use('/', express.static('./website/static', { maxAge: oneDay }));

app.get('/api/all/imperdibili', apicache('1 day'), function (request, response) {
   query.listCategoryBool("imperdibile", function (data) {
       response.writeHead(200, {"Content-Type": "application/json"});
       response.end(JSON.stringify(data));
   });
});

app.get('/api/all/mosaici', apicache('1 day'), function (request, response) {
   query.listCategoryBool("mosaico", function (data) {
       response.writeHead(200, {"Content-Type": "application/json"});
       response.end(JSON.stringify(data));
   });
});

app.get('/api/all/:type', apicache('1 day'), function (request, response) {
   query.listDocsType(request.params.type, function (data) {
       response.writeHead(200, {"Content-Type": "application/json"});
       response.end(JSON.stringify(data));
   });
});

app.get('/api/doc/:id', apicache('1 day'), function (request, response) {
   query.getDoc(request.params.id, function (data) {
       response.writeHead(200, {"Content-Type": "application/json"});
       response.end(JSON.stringify(data));
   });
});

app.get('/api/geo/nearest', apicache('1 day'), function (request, response) {
   query.getLocations(request.query, function (data) {
       response.writeHead(200, {"Content-Type": "application/json"});
       response.end(JSON.stringify(data));
   });
});

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});

require("cf-deployment-tracker-client").track();
