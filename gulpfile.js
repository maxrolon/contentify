require('es6-promise').polyfill();
var gulp = require('gulp');
var sendToShopify = require('./tasks/send');
var buildTemplate = require('./tasks/build');
var child = require('child_process');
var fs = require('fs');
require('./tasks/data');

gulp.task('watch', function() {
  gulp.watch(['./dist/**/*'],sendToShopify);
  gulp.watch(['./src/**/*','./data/**/*','!./src/assets/**/*'],buildTemplate);
  //gulp.watch(['./src/assets/**/*'],['build:assets']);
});

gulp.task('server', ['send'], function() {
  var server = child.spawn('node', ['server.js']);
  var log = fs.createWriteStream('server.log', {flags: 'a'});
  server.stdout.pipe(log);
  server.stderr.pipe(log);
});

gulp.task('default',['watch','server']);
