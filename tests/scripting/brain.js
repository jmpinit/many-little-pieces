var vm = require('vm'),
	spawn = require( 'child_process' ).spawn;

var user = {
	x: 32,
	y: 32
};

var context = vm.createContext(user);
vm.runInContext('x += 1; while(true) {}', context);

child = spawn({}, [{}] )

var timer = setTimeout( function() {
	child.stdout.removeListener( 'output', output );
	stdout = JSON.stringify( { result: 'TimeoutError', console: [] } );
	child.kill( 'SIGKILL' );
}, 1000 );
