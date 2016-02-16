var gulp = require('gulp');
var ShopifyAPI  = require('shopify-node-api');
var settings = require('./../config.json').shopify;
var fs = require('fs');
var util = require('gulp-util');

settings.verbose = false;
var Shopify = new ShopifyAPI(settings);

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

  Shopify.put('/admin/themes/'+settings.theme+'/assets.json',data,function(err,data,headers){
    if (typeof err != 'undefined'){
      console.dir(err)
    } else if (data.asset){
      util.log(util.colors.magenta(data.asset.key+' uploaded'));
    } else {
      console.dir(data);
    }
  });
};

gulp.task('send',['build'],send);
module.exports = send;



