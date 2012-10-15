function TextView(cvs, w, h, img, sw, sh) {
	this.canvas = cvs;
	
	this.width = w;
	this.height = h;
	
	this.symWidth = sw;
	this.symHeight = sh;
	
	this.font = img;
	
	this.text = new Array();
	
	this.dirty = true;
	
	//initialize the text array
	for(var y=0; y<this.height; y++) {
		for(var x=0; x<this.width; x++) {
			this.text[y*this.width+x] = " ";
		}
	}
}

TextView.prototype = {
	render: function() {
		if(this.dirty&&this.canvas.getContext) {
			var ctx = this.canvas.getContext('2d');
			
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			
			for(var y=0; y<this.height; y++) {
				for(var x=0; x<this.width; x++) {
					this.drawText(ctx, x*this.symWidth, y*this.symHeight, this.text[y*this.width+x]);
				}
			}
		}
	},
	
	putText: function(x, y, c) {
		if(x>=0&&x<this.width&&y>=0&&y<this.height) {
			if(c.length==1) {
				this.text[y*this.width+x] = c;
			}
		}
	},
	
	clearText: function() {
		for(var i=0; i<this.text.length; i++) {
			this.text[i] = " ";
		}
	},
	
    drawText: function(ctx, x, y, c) {
		var i = c.charCodeAt(0)-32;
		if(i>=0 && i<=94) {
			var row = Math.floor(i/10);
			var col = i-row*10;
			
			ctx.drawImage(this.font, col*this.symWidth, row*this.symHeight, this.symWidth, this.symHeight, x, y, this.symWidth, this.symHeight);
		}
	}
}
