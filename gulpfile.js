require('es6-promise').polyfill();

var gulp = require('gulp');
require('./tasks/data');
//require('./tasks/build');
//require('./tasks/send');

//gulp.task('build', ['build:templates','build:assets']);

gulp.task('build:templates',['data'],function(){
});

gulp.task('watch', function() {
  gulp.watch(['./dist/**/*'],['send:theme']);
  gulp.watch(['./src/templates/**/*','./data/**/*'],['build:templates']);
  gulp.watch(['./src/assets/**/*'],['build:assets']);
});
