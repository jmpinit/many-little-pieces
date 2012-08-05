function Console(scrn, processor) {
	this.buffer = "";
	this.limit = 64;
	this.screen = scrn;
	this.process = processor;
}

Console.prototype = {
	input: function(code) {
		if(this.buffer.length<=this.limit) {
			switch(code) {
				case 13:	//ENTER
					alert("ENTER");
					this.process();
					break;
				case 8:		//BACKSPACE
					this.buffer = "";
					this.screen.clear();
					break;
				default:
					//alert(code);
					this.buffer += String.fromCharCode(code);
					this.print();
					this.processor(this.buffer);
					break;
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
				y = 0;
			}
		}
		
		this.screen.dirty = true;
	},
}
