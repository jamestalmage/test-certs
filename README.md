# test-certs
set of https certs and keys that expire in 100 years (for tests only).

[![Build Status](https://travis-ci.org/jamestalmage/test-certs.svg?branch=master)](https://travis-ci.org/jamestalmage/test-certs)

Provides a set of keys and certificates for client, server, and certificate authority.
The Server certificate is for the `localhost` domain name, so you developers can test against their 
local machine without generating certificate errors (you need to add the CA as a signing authority, see below).


```javascript
var certs = require('test-certs');

console.log(certs);
certs === {
    ca: {
        cert: '<Certificate Authority (CA) Certificate>',
        key:  '<CA Private Key>,
    },
    server: {
        cert: '<Server Certificate>',    // Comes with proper extensions for an HTTP server
        key: '<Server Private Key>'
    },
    client: {         
        cert: '<Client Certificate>',
        key: '<Client Private Key>'
    }
};
```

### usage

```javascript
var https = require('https'); 
var certs = require('test-certs');
var port = 37124; // random

var server = https.createServer(certs.server, function(req, res){/* handle request */});

server.listen(37124, cb);

// wait for the server to come up

var client = https.get({
  host: 'localhost',
  path: '/',
  port: port,
  agent: new https.Agent({ca: [certs.ca.cert]})
}, function(res) {/* handle response*/});

```

There is a working example in the `example` directory.
