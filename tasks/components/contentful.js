var settings = require('./../../config.json');
var Contentful = require('contentful');

var fn = function(resolve){
  var contentfulAPI = Contentful.createClient(settings.contentful);
  contentfulAPI.entries({content_type:'page'})
  .then(function (entries) {
    resolve(entries)
  });
}

module.exports = fn;
