function Console(scrn) {
	this.buffer = "";
	this.limit = 64;
	this.screen = scrn;
}

Console.prototype = {
	input: function(code) {
		if(code.length<=this.limit) {
			switch(code) {
				case 13:	//ENTER
					this.process();
					break;
				case 8:		//BACKSPACE
					this.buffer = this.buffer.substring(0, length-1);
					this.screen.dirty = false;
					breakl
				default:
					this.process();
					break;
			}
		}
	},
	
	process: function() {
	}
}
