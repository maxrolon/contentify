var express = require('express')();
var fs      = require('fs');
require('./gulpfile');

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

global.root = __dirname;

express.listen(port,ip,function(){
	console.log('%s: Node server started on %s:%d ...',
	Date(Date.now() ),ip,port);
});

express.get('/webhook/?*', function(req, res){
  //gulp.start('build:templates');
});

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

process.on('exit',terminator);

//gulp.start('watch');
