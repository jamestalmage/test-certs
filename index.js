var fs = require('fs');

function read(name) {
  return {
    cert: fs.readFileSync(__dirname + '/certs/' + name + '.crt', 'utf8'),
    key: fs.readFileSync(__dirname + '/certs/' + name + '.pem', 'utf8')
  };
}

module.exports = {
  ca: read('ca'),
  client: read('client'),
  server: read('server')
};