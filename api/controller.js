var chain = {};
chain.connect    = require('./actions/connect');
chain.cacheData  = require('./actions/cacheData');
chain.sendData   = require('./actions/sendData');
chain.buildTheme = require('./actions/buildTheme');
chain.sendTheme  = require('./actions/sendTheme');

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
        chain
        .connect('contentful')
        .cacheData()
        .buildTheme()
        .connect('shopify')
        .sendTheme();
      break;
      case 'shopify':
        chain
        .connect('shopify')
        .connect('contentful')
        .sendData('shopify > contentful');
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
