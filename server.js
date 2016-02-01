//  OpenShift sample Node application
require('es6-promise').polyfill();

var express = require('express')();
var fs      = require('fs');

var api = require('./api/init')(express);

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

process.on('exit',terminator);

['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
].forEach(function(element, index, array) {
		process.on(element, function() { terminator(element); });
});

function terminator(sig){
	if (typeof sig === "string") {
		 console.log('%s: Received %s - terminating sample app ...',Date(Date.now()), sig);
		 process.exit(1);
	}
	console.log('%s: Node server stopped.', Date(Date.now()) );
};

express.listen(port,ip,function(){
	console.log('%s: Node server started on %s:%d ...',
	Date(Date.now() ),ip,port);
});
