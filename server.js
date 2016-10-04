var express = require('express');
var query = require('./query.js');
var apicache = require('apicache').options({ debug: true }).middleware;

var oneDay = 86400000;
var app = express();

app.use('/',express.static('.', { maxAge: oneDay }));


/* PAGES */
app.get('/about', function (request, response) {
    response.sendFile(__dirname + '/about.html');
});


/* QUERY */
app.get('/archimede/:type/:query/', apicache('1 day'), function (request, response) {
    query.launchQuery(request, response, request.params.type, decodeURIComponent(request.params.query), "application/json");
});


app.use(function(req, res) {
    res.status(404).sendFile(__dirname + '/404.html');
});

var server = app.listen(80, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});
