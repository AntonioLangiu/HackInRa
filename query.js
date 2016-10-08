var https = require('https');
var host = "4ac10947-aef3-43fa-ab73-6f212fc11b4b-bluemix.cloudant.com"; //N.B. non ci va http o https
var querystring = require('querystring');
var Cloudant = require('cloudant');
var me = '4ac10947-aef3-43fa-ab73-6f212fc11b4b-bluemix'; // Replace with your account
var password = process.env.cloudant_password;
var requestlib = require("request");

exports.listDocsType = function (type, cb) {
  Cloudant({account:me, password:password}, function(err, cloudant) {
    if (err) {
      return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    var db = cloudant.db.use("scoprira");
    db.find({selector:{"properties": {"type": type}}}, function(err, data) {
      console.log("listDocsType" + data);
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
      console.log("getDoc" + data);
      cb(data)
    });
  });
}

exports.getLocations = function (request, cb) {
  Cloudant({account:me, password:password}, function(err, cloudant) {
    if (err) {
      return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    //var db = cloudant.db.use("scoprira");
    //db.geo('places', 'GeoIndex', request, function(err, data) {
    //https://4ac10947-aef3-43fa-ab73-6f212fc11b4b-bluemix.cloudant.com/scoprira/_design/places/_geo/GeoIndex?g=point(29+-95)&limit=20&nearest=true
    var url = "https://" + encodeURIComponent(host) + "/scoprira/_design/" +
               encodeURIComponent("places") + "/_geo/" +
               encodeURIComponent("GeoIndex") + "?" +
               querystring.stringify({
                 nearest: true,
                 limit: request.limit,
                 g: "point("+request.lat+" "+request.lon+")"
               });
    console.log("url", url)
    requestlib(url, function (error, response, body) {
      console.log("error ", error);
      //console.log("response ", response);
      console.log("body ", body);
      //console.log("geo points " + data);
      cb(body); // XXX
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
