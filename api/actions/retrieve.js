var settings      = require('./../../config.json');
var ShopifyAPI    = require('shopify-node-api');
var ContentfulAPI = require('contentful');
var ContentfulManagementAPI = require('contentful-management');

var error = function(error){
  console.dir(error)
}

var request;

var shopify = function(resolve){
  var shopifyAPI = new ShopifyAPI(settings.shopify);
  shopifyAPI.get(request.endpoint, function(err, data, headers){
    resolve(data);
  });
}

var contentful = function(resolve){
  var contentfulAPI = ContentfulAPI.createClient(settings.contentful);
  contentfulAPI.entries({content_type:request.contentType})
  .then(function (entries) {
    resolve(entries)
  },error);
}

var contentfulManagement = function(resolve){
  var contentfulAPI = ContentfulManagementAPI.createClient(settings.contentfulManagement);
  contentfulAPI.getSpace(settings.contentfulManagement.space)
  .then(function (space) {
    console.log(space)
  },error);
}

module.exports = {
  shopify:function(req){
    request = req;
    return new Promise(shopify)
  },
  contentful:function(req){
    request = req;
    return new Promise(contentful)
  }
}
