function Inventory(scrn) {
	this.buffer = "";
	this.screen = scrn;
}

Inventory.prototype = {
	input: function(c) {
		this.buffer += c;
		this.print();
	},
	
	print: function() {
		for(var i=0; i<"inventory".length; i++) { this.screen.putText(i, 0, "inventory".charAt(i)); }
		
		var x = 0;
		var y = 1;
		for(var i=0; i<this.buffer.length; i++) {
			this.screen.putText(x, y, this.buffer.charAt(i));
			
			x++;
			if(x>this.screen.width) {
				y++;
				x = 0;
			}
		}
		
		this.screen.dirty = true;
	},
}
