var retrieve  = require('./actions/retrieve');
var send      = require('./actions/send');
var cache     = require('./actions/cache');
var build     = require('./actions/build');
var aggregate = require('./actions/aggregate');

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
        retrieve.contentful(this.req)
        .then(cache)
        .then(build)
        .then(send.theme);
      break;
      case 'shopify':
        retrieve.shopify(this.req)
        .then(retrieve.contentful)
        .then(aggregate)
        .then(send.contentful);
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
