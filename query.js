var https = require('https');

var host = "4ac10947-aef3-43fa-ab73-6f212fc11b4b-bluemix.cloudant.com"; //N.B. non ci va http o https

var Cloudant = require('cloudant');
var me = '4ac10947-aef3-43fa-ab73-6f212fc11b4b-bluemix'; // Replace with your account
var password = process.env.cloudant_password;

exports.listDocsType = function (type, cb) {
  Cloudant({account:me, password:password}, function(err, cloudant) {
    if (err) {
      return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    var db = cloudant.db.use("scoprira");
    db.find({selector:{"type": type}}, function(err, data) {
      if (err) throw err;
      console.log("allDocsType" + data);
      cb(data.docs)
    });
  });
}

exports.getDoc = function (id, cb) {
  Cloudant({account:me, password:password}, function(err, cloudant) {
    if (err) {
      return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    var db = cloudant.db.use("scoprira");
    db.get(id, function(err, data) {
      if (err) throw err;
      console.log("allDocsType" + data);
      cb(data)
    });
  });

}
exports.launchQuery = function (request, response, query, acceptFormat) {
    var options = {
        host: host,
        path: "/scoprira",
        port: "443",
        method: "GET"
    };


    var req = https.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        var result = "";
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
