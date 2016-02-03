var entries, promise;

function init(p){
  promise = p;
  console.dir('build');
}

module.exports = function(data){
  entries = data;
  new Promise(init);
}
