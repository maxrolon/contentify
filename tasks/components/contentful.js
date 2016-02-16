var settings = require('./../../config.json');
var Contentful = require('contentful');

var fn = function(resolve){
  var contentfulAPI = Contentful.createClient(settings.contentful);
  contentfulAPI.entries()
  .then(function (entries) {
    resolve(entries)
  },function(err){
    console.dir(err)
  });
}

module.exports = fn;
