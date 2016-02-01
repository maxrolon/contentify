var Controller = require('./controller'),
    fs         = require('fs');

var fn = function(server){
  server.get('/', function(req, res){
    var index = fs.readFileSync('./api/views/index.html');
    res.setHeader('Content-Type', 'text/html');
    res.send(index);
  });
  server.get('/webhook/?*', function(req, res){
    new Controller(req,res);
  });
}
module.exports = fn;
