function TextView(w, h) {
	this.width = w;
	this.height = h;
	
	this.map = new Array();
}

TextView.prototype = {
	clear: function() {
		for(var y=0; y<this.height; y++) {
			for(var x=0; x<this.width; x++) {
				this.map[y*this.width+x] = " ";
			}
		}
	},
	
	texel: function(x, y, c) {
		if(c.length==1) {
			if(x>=0&&x<this.width&&y>=0&&y<this.height) {
				this.map[y*this.width+x] = c;
			}
		}
	},
	
	write: function(x, y, str) {
		for(var i=0; i<str.length; i++) {
			this.texel(x+i, y, str.charAt(i));
		}
	},
	
	rect: function(x, y, width, height, c) {
		//draw a rectangle at this position
		//using this character
	},
	
	image: function(x, y, img) {
		for(var offY=0; offY<img.height; offY++) {
			for(var offX=0; offX<img.width; offX++) {
				var c = img.map[offY*img.width+offX];
				
				if(typeof c !== 'undefined') {
					this.texel(x+offX, y+offY, c);
				}
			}
		}
	},
	
	//return a string representing this vistext
	render: function() {
		var text = "";
		for(var y=0; y<this.height; y++) {
			for(var x=0; x<this.width; x++) {
				var c = this.map[y*this.width+x];
				if(typeof c !== 'undefined') {
					if(c==" ") {
						text += "&nbsp;";
					} else {
						text += c;
					}
				} else {
					text += "X";
				}
			}
			text += "<br>";
		}
		
		return text;
	}
}

function TextImage(packed) {
	this.map = new Array();
	
	//get the width and height
	var x = 0;
	var y = 0;
	this.width = 0;
	this.height = 0;
	for(var i=0; i<packed.length; i++) {
		var c = packed.charAt(i);
		if(c=='\n') {
			y++;
			x = 0;
		} else {
			x++;
		}
		
		if(x>this.width) {
			this.width = x;
		}
	}
	
	this.width++;
	this.height = y+1;
	
	//construct map
	x = 0;
	y = 0;
	for(var i=0; i<packed.length; i++) {
		var c = packed.charAt(i);
		
		if(c=='\n') {
			y++;
			x = 0;
		} else if(c=="'") {		//transparent
			x++;
		} else {
			this.map[y*this.width+x] = c;
			x++;
		}
	}
}

TextImage.prototype = {
	getTexel: function(x, y) {
		return this.map[y*this.width+x];
	}
}
