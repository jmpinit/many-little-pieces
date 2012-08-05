var sandbox = require('sandbox'),
	brain = new Object();

brain.think = function(code,inObject) {
	var s = new sandbox();
	var toReturn;
	s.run("i = ("+JSON.stringify(inObject)+");\n"+code,function( output ) { console.log('output function called');toReturn = output; });
	return toReturn;
}

console.log(brain.think("console.log(i);return 'nothing';","something"));