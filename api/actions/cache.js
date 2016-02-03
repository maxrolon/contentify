var fs = require('fs'),
slug   = require('slug'),
random = require('randomstring'),
jsonfile = require('jsonfile');

var dataDir = global.root+'/data',
entries, promise, written = 0;

function init(p){
  promise = p;

  fs.stat(dataDir,function(err){
    if (err && err.errno){
      fs.mkdir(dataDir,iterate);
    } else {
      iterate()
    }
  });
}

function iterate(err){
  entries.forEach(saveFile);
}

function saveFile(entry,i){
  entry.type  = entry.sys.contentType.sys.id;
  entry.title = slug(entry.fields.name || entry.fields.id || random.generate(7));
  entry.dir   = dataDir+'/'+entry.type;

  fs.mkdir(entry.dir,function(){
    var file = this.dir+'/'+this.title+'.json';
    jsonfile.writeFile(file,this.fields,complete);
  }.bind(entry))
}

function complete(){
  written++;
  if (written == entries.length){
    promise(entries);
  }
}

module.exports = function(data){
  entries = data;
  return new Promise(init);
}
