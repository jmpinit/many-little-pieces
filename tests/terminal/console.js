function Console(scrn, processor) {
	this.buffer = "";
	this.limit = 64;
	this.screen = scrn;
	this.process = processor;
}

Console.prototype = {
	input: function(code) {
		if(this.buffer.length<=this.limit) {
				if(code==13) {				//ENTER
					this.process(this.buffer);
					this.buffer = "";
					this.screen.clearText();
				} else if(code==8) {		//BACKSPACE
					this.buffer = "";
					this.screen.clearText();
				} else if(code>=32 && code<=129) {
					this.buffer += String.fromCharCode(code);
					this.print();
				}
		}
	},
	
	print: function() {
		var x = 0;
		var y = 0;
		for(var i=0; i<this.buffer.length; i++) {
			this.screen.putText(x, y, this.buffer.charAt(i));
			
			x++;
			if(x>this.screen.width) {
				y++;
				x = 0;
			}
		}
		
		this.screen.dirty = true;
	}
}
