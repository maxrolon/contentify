var fn = function(server){
  server.get('/', function(req, res){
    res.send('hello world');
  });
}
module.exports = fn;
