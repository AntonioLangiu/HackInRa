var express = require('express');
var query = require('./query.js');
var apicache = require('apicache').options({ debug: true }).middleware;
var bodyParser = require('body-parser');

var port = process.env.VCAP_APP_PORT || 8080;
var oneDay = 86400000;
var app = express();

app.use('/',express.static('./website/static', { maxAge: oneDay }));
app.use(bodyParser.json());

/* PAGES */
app.get('/about', function (request, response) {
    response.sendFile(__dirname + '/about.html');
});


/* QUERY */
app.get('/api/all/:type', apicache('1 day'), function (request, response) {
   query.listDocsType(request.params.type, function (data){
       response.writeHead(200, {"Content-Type": "application/json"});
       response.end(JSON.stringify(data));
   });
});

app.get('/api/doc/:id',apicache('1 day'), function (request, response) {
   query.getDoc(request.params.id, function (data){
       response.writeHead(200, {"Content-Type": "application/json"});
       response.end(JSON.stringify(data));
   });
});

app.post('/api/geo',apicache('1 day'), function (request, response) {
   query.getLocations(request.body, function (data){
       response.writeHead(200, {"Content-Type": "application/json"});
       response.end(JSON.stringify(data));
   });
});


app.use(function(req, res) {
    res.status(404).sendFile(__dirname + '/404.html');
});

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});

require("cf-deployment-tracker-client").track();
