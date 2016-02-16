var gulp = require('gulp');
var ShopifyAPI  = require('shopify-node-api');
var settingsShop = require('./../config.json').shopify;
var settingsHip = require('./../config.json').hipchat;
var fs = require('fs');
var util = require('gulp-util');
var HipChat = require('node-hipchat');

settingsShop.verbose = false;
var Shopify = new ShopifyAPI(settingsShop);

var hipChat = new HipChat(settingsHip);

var messageArgs = {
  "room":'2444383',
  "from":"Contentify",
  "color":"random"
}

function send(event){
  if (typeof event == 'object' && event.path){
    relativePath = event.path.split('/dist/')[1];
    absolutePath = event.path;
  } else {
    console.dir('send whole theme');
    return gulp.src('./dist/**');
  }

  var data = {
    asset:{
      "key":relativePath,
      "value":fs.readFileSync(absolutePath,'utf8')
    }
  };

  Shopify.put('/admin/themes/'+settingsShop.theme+'/assets.json',data,function(err,data,headers){
    if (typeof err != 'undefined'){
      console.dir(err)
    } else if (data.asset){
      if (process.env.OPENSHIFT_APP_NAME){
        messageArgs.message = data.asset.key+' uploaded';
        hipChat.postMessage(messageArgs);
      }
      util.log(util.colors.magenta(data.asset.key+' uploaded'));
    } else {
      console.dir(data);
    }
  });
};

gulp.task('send',['build'],send);
module.exports = send;



