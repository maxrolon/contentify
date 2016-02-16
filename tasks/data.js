var gulp = require('gulp');
var random = require('randomstring');
var source = require('vinyl-source-stream');
var contentful = require('./components/contentful');
var slug = require('slug');

var entries, endings = 0;

function startStream(resolve){

  function _complete(){
    endings++;
    if (endings == entries.length)
      resolve();
  }

  function _end(streamToClose){
    streamToClose.end();
  }

  for(var i = 0;i < entries.length;i++){
    var entry = entries[i];
    var fileName = entry.fields.name || entry.fields.id || random.generate('7');

    var fileNameWithDir, fileDir = false;
    if ( fileName.indexOf('/') >= 0){
      fileNameWithDir = fileName.split('/');
      fileName = fileNameWithDir.pop();
      fileDir  = fileNameWithDir.join('/');
    }

    var stream = source(slug(fileName)+'.json');
    stream.write(JSON.stringify(entry.fields, null, 2));
    stream.pipe( gulp.dest('./data' + ( fileDir ? '/'+fileDir : '') ));

    process.nextTick(_end.bind(this,stream));

    stream.on('end',_complete);
  }
}

function wrapper(){
  return new Promise(contentful).then(function(data){ 
    entries = data;
    return new Promise(startStream);
  });
}

gulp.task('data',wrapper);
module.exports = wrapper;
