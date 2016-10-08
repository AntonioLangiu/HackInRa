var me = '4ac10947-aef3-43fa-ab73-6f212fc11b4b-bluemix'; // Your account
var host = me + ".cloudant.com"; // Note: no URL schema needed here
var querystring = require('querystring');
var Cloudant = require('cloudant');
var fs = require('fs');
var process = require('process');

// Note: apparently it would be fine for this to be undefined if you have
// set up a database without any read restriction
var password = process.env.cloudant_password;

var list = fs.readFileSync(process.argv[2]);
list =  JSON.parse(list);
console.log(list);


Cloudant({account:me, password:password}, function (err, cloudant) {
  if (err) {
    // XXX here it would be better to callback(err)
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
  var db = cloudant.db.use("scoprira");
  db.bulk({docs: list}, function (err, data) {
    // TODO: do we need to check for `docs` being undefined here?
    }
  );
});



