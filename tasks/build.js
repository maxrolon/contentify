var gulp = require('gulp');
var mustache = require('gulp-mustache');
var data = require('gulp-data');
var util = require('gulp-util');
var flattenSnippets = require('./components/flatten-snippets');
var path = require('path');

var entries, promise;

function build(event){
  var src = [
    './src/**/*.liquid',
    '!./src/assets/**/*'
  ], 
  opts = {}, 
  srcSplit;

  if (typeof event == 'object' && event.path){
    src = event.path;
    if (src.indexOf('/data/') >= 0){
      srcSplit = src.split('/data/')
    } else {
      srcSplit = src.split('/src/')
    };

    src = srcSplit[0]+'/src/'+srcSplit[1];
    src = util.replaceExtension(src,'.liquid');
    opts = {
      base: srcSplit[0]+'/src/'
    } 
  }

  return gulp.src(src,opts)
  .pipe(data(function(file){
    var fileName = file.path || file.history[0], fileContents;
    var relativePath = fileName.split('/src/')[1];
    try{
      fileContents = require('./../data/' + util.replaceExtension(relativePath,'.json'));
    } catch(e){
      return {};
    }
    return fileContents;
  }))
  .pipe(mustache(null,{tags:["{!","!}"]}))
  .pipe(flattenSnippets())
  .pipe(gulp.dest('./dist'));
}

gulp.task('build:templates',['data'],build);
gulp.task('build:assets',[],function(){
  console.dir('build:assets');
});
gulp.task('build',['build:templates','build:assets']);
module.exports = build;

