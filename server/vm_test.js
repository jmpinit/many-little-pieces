var util = require('util'),
	vm = require('vm'),
	sandbox = {
		teststr: "awesomeNES",
		testint: 42
	}
	
vm.runInNewContext('var result=teststr+testint',sandbox) //there is also an optional filename argument which is /only/ used in stack traces
console.log(util.inspect(sandbox));
// {  teststr: "awesomeNES", testint: 42, result: "awesomeNES42"  }