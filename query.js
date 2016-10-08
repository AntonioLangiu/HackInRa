var https = require('https');
var me = '4ac10947-aef3-43fa-ab73-6f212fc11b4b-bluemix'; // Your account
var host = me + ".cloudant.com"; // Note: no URL schema needed here
var querystring = require('querystring');
var Cloudant = require('cloudant');

// Note: apparently it would be fine for this to be undefined if you have
// set up a database without any read restriction
var password = process.env.cloudant_password;

// TODO: perhaps always use this easier library to make requests
var requestlib = require("request");

// TODO: refactor this callback to take error as first argument
exports.listDocsType = function (type, cb) {
  Cloudant({account:me, password:password}, function (err, cloudant) {
    if (err) {
      // XXX here it would be better to callback(err)
      return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    var db = cloudant.db.use("scoprira");
    db.find({selector:{"properties": {"categoria": type}}}, function (err, data) {
      console.log("listDocsType:", data);
      // TODO: do we need to check for `docs` being undefined here?
      cb(data.docs);
    });
  });
};

exports.listCategoryBool = function (label, cb) {
  Cloudant({account:me, password:password}, function (err, cloudant) {
    if (err) {
      // XXX here it would be better to callback(err)
      return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    var db = cloudant.db.use("scoprira");
    console.log(label)
    var dict = {};
    dict[label] = true;
    db.find({selector:{"properties": dict}}, function (err, data) {
      console.log("listDocsType:", data);
      // TODO: do we need to check for `docs` being undefined here?
      cb(data.docs);
    });
  });
};

exports.getDoc = function (id, cb) {
  // TODO: we can perhaps factor out the login as a common function
  Cloudant({account:me, password:password}, function(err, cloudant) {
    if (err) {
      return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    var db = cloudant.db.use("scoprira");
    db.get(id, function(err, data) {
      console.log("getDoc", data);
      cb(data);
    });
  });
};

// XXX I believe the following function to depend on the database to
// contain an index for geographical data. Use Cloudant's web interface
// to create said index because doing it from node is not simple
exports.getLocations = function (request, cb) {
  Cloudant({account:me, password:password}, function (err, cloudant) {
    if (err) {
      return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    // Note: code adapted from Cloudant's own API
    // Note: we rolled out our own implementation because we failed to
    // use Cloudant's own API to successfully make the request
    var url = "https://" + encodeURIComponent(host) + "/scoprira/_design/" +
               encodeURIComponent("places") + "/_geo/" +
               encodeURIComponent("GeoIndex") + "?" +
               querystring.stringify({
                 nearest: true,
                 limit: request.limit,
                 g: "point(" + request.lat + " " + request.lon + ")"
               });
    console.log("url", url);
    requestlib(url, function (error, response, body) {
      console.log("error ", error);
      //console.log("response ", response);
      console.log("body ", body);
      try {
        body = JSON.parse(body);
      } catch (e) {
        return; // XXX
      }
      if (body.rows === undefined) {
        return; // XXX
      }
      body = body.rows;
      // FIXME FIXME FIXME Workaround suprising cloudant behavior
      for (var i = 0; i < body.length; ++i) {
        if (body[i].type === undefined) {
          body[i].type = "Feature";
        }
      }
      //console.log("geo points " + data);
      cb(body);
    });
  });
};

exports.launchQuery = function (request, response, query, acceptFormat) {
    var options = {
        host: host,
        path: "/scoprira",
        port: "443",
        method: "GET"
    };

    var req = https.request(options, function (res) {
        console.log('STATUS: ', res.statusCode);
        console.log('HEADERS: ', res.headers);
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
        // XXX perhaps here we should callback
    });
    req.end();
};
