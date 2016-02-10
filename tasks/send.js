var settings      = require('./../../config.json');
var ShopifyAPI    = require('shopify-node-api');
var ContentfulAPI = require('contentful');

var value;

var shopify = function(resolve){
  console.dir(value);
  resolve();
}

var contentful = function(resolve){
  console.dir(value);
  resolve();
}

module.exports = {
  shopify:function(val){
    value = value; 
    return new Promise(shopify)
  },
  contentful:function(val){
    value = val; 
    return new Promise(contentful)
  }
}
