var connect    = require('./actions/connect');
var cacheData  = require('./actions/cacheData');
var sendData   = require('./actions/sendData');
var buildTheme = require('./actions/buildTheme');
var sendTheme  = require('./actions/sendTheme');

var fn = function(req,res){
  this.req = req;
  this.res = res;
  this.url = req.url;

  this.init();
}

fn.prototype = {
  init:function(){
    this.setHook();
    this.executeByHook();
  },
  setHook:function(){
    var parsedUrl = this.url.split('/');
    var hook = parsedUrl.pop();

    this.hook = hook;
  },
  executeByHook:function(){
    switch(this.hook){
      case 'contentful':
        connect.contentful
        .then(cachData)
        .then(buildTheme)
        .then(connect.shopify)
        .then(sendTheme);
      break;
      case 'shopify':
        connect.contentful
        .then(connect.shopify)
        .then(sendData.contentful);
      break;
      default:
        this.exit('hook not supported');
        return;
      break;
    }

    this.exit();
  },
  exit:function(note){
    this.res.send( (note || 'complete') );
  }
}

module.exports = fn;
