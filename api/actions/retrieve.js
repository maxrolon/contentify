var settings      = require('./../../config.json');
var ShopifyAPI    = require('shopify-node-api');
var ContentfulAPI = require('contentful');

var request;

var shopify = function(resolve){
  setTimeout(function(){
    resolve('value1');
  },2000)
}

var contentful = function(){
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
