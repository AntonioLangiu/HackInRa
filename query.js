var http = require('http');

var host = "synapta.io"; //N.B. non ci va http o https

exports.launchQuery = function (request, response, query, acceptFormat) {
    var options = {
        host: host,
        path: "/changeMePlease
        port: "1234",
        method: "GET"
    };


    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            result += chunk;
        });

        res.on('end', function() {
            response.send(result);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
}
