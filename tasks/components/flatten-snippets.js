var path = require('path');
var through2 = require('through2');
var PluginError = require('gulp-util').PluginError;

module.exports = function() {
  return through2.obj(function(file, enc, next) {
		var filePath = file.path || file.history[0];
    if (!file.isDirectory() ) {
      try {
        if(filePath.indexOf('/snippets/') >= 0){
          var fileName = filePath.split('/').pop();
          file.path = path.join(file.base, 'snippets/'+fileName);
        }
        this.push(file);
      } catch (e) {
        this.emit('error', new PluginError('gulp-flatten-snippets', e));
      }
    }
    next();
  });
};
