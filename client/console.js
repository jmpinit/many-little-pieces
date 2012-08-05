function Console(canvas) {
	this.buffer = "";
	
}

Console.prototype = {
	input: function(msg) {
		if(msg.charCodeAt(0)==13) {
			this.process();
		} else {
			this.buffer += msg;
		}
	},
	
	process: function() {
		
	}
}
