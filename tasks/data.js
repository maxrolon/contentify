var gulp = require('gulp');
var random = require('randomstring');
var source = require('vinyl-source-stream');
var contentful = require('./components/contentful');

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
    var fileName = entry.fields.name || entry.fields.id || random.generate(7);
    var stream = source(fileName+'.json');
    stream.write(JSON.stringify(entry.fields));
    stream.pipe(gulp.dest('./data'));

    process.nextTick(_end.bind(this,stream));

    stream.on('end',_complete);
  }
}

gulp.task('data',function(){
  return new Promise(contentful).then(function(data){ 
    entries = data;
    return new Promise(startStream);
  });
});
