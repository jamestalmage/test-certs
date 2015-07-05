var https = require('https');
var certs = require('../');
var assert = require('assert');

var server = https.createServer(certs.server, function(req, res){
  res.write('hello world');
  res.end();
}).listen(37124, client);


function client() {
  var options = {
    host: 'localhost',
    port: 37124,
    path: '/',
    agent: new https.Agent({ca:[certs.ca.cert]})
  };

  https.get(options, handleResponse).on('error', handleError);
}

function handleError (err) {
  console.log(err);
  process.exit(1);
}

function handleResponse (res) {
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
  res.on('error', handleError);
}

setTimeout(function() {
  // we should bail with process.exit(0) above before this happens
  throw new Error('timed out');
}, 2000);
