var https = require('https');
var certs = require('../');
var assert = require('assert');
var node8 = require('semver').lt(process.version, '0.9.0');

var server = https.createServer(certs.server, function(req, res){
  res.write('hello world');
  res.end();
}).listen(37124, client);


function client() {
  https.get({
    host: 'localhost',
    port: 37124,
    path: '/',
    agent: node8 ? false : new https.Agent({ca: [certs.ca.cert]})
  }, function(res) {
    var buf = '';
    res.setEncoding('utf8');
    res.on('data', function(data) {
      buf += data;
    });
    res.on('end', function() {
      assert.equal(buf, 'hello world');
      console.log('TEST PASSED');
      process.exit(0);
    });

  }).on('error', assert.fail.bind(assert));
}

setTimeout(function() {
  // we should bail with process.exit(0) above before this happens
  throw new Error('timed out');
}, 2000);
