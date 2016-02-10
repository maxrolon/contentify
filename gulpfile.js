require('es6-promise').polyfill();

var gulp = require('gulp');
var data = require('./tasks/data');
require('./tasks/build');
require('./tasks/send');

gulp.task('data',data);

gulp.task('build', ['data'], function(){
  console.dir(gulp);
  //gulp.start('build:templates');
  //gulp.start('build:assets');
});

gulp.task('watch', function() {
  gulp.watch(['./dist/**/*'],['send:theme']);
  gulp.watch(['./src/templates/**/*','./data/**/*'],['build:templates']);
  gulp.watch(['./src/assets/**/*'],['build:assets']);
});
