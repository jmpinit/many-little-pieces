function Player(x, y) {
	this.x = x;
	this.y = y;
}

Player.prototype = {
	moveUp: function() {
		
	},
	
	moveDown: function() {
		
	},
	
	moveLeft: function() {
		
	},
	
	moveRight: function() {
		
	}
}

function World() {
	this.chunksize = 16;
	
	this.chunks = [];
}

World.prototype = {
	createChunk: function(col, row) {
		var i = col+','+row;
		this.chunks[i] = [];
		
		//random initialization
		for(var y=0; y<this.chunksize; y++) {
			for(var x=0; x<this.chunksize; x++) {
				var c = " ";
				if(Math.random()>0.6) {
					c = String.fromCharCode(Math.floor(Math.random()*94+32));
				}
				this.chunks[i][y*this.chunksize+x] = c;
			}
		}
		
		//B678/S345678
		for(var q=0; q<10; q++) {
			for(var y=0; y<this.chunksize; y++) {
				for(var x=0; x<this.chunksize; x++) {
					var n = 0;
					if(this.chunks[i][(y-1)*this.chunksize+x-1]!=" ") {n+=1;}
					if(this.chunks[i][(y-1)*this.chunksize+x]!=" ") {n+=1;}
					if(this.chunks[i][(y-1)*this.chunksize+x+1]!=" ") {n+=1;}
					
					if(this.chunks[i][y*this.chunksize+x-1]!=" ") {n+=1;}
					if(this.chunks[i][y*this.chunksize+x+1]!=" ") {n+=1;}
					
					if(this.chunks[i][(y+1)*this.chunksize+x-1]!=" ") {n+=1;}
					if(this.chunks[i][(y+1)*this.chunksize+x]!=" ") {n+=1;}
					if(this.chunks[i][(y+1)*this.chunksize+x+1]!=" ") {n+=1;}
					
					if(n>=6 && n<=8) {
						c = String.fromCharCode(Math.floor(Math.random()*94+32));
						this.chunks[i][y*this.chunksize+x] = c;
					} else if(n>=0 && n<=2) {
						this.chunks[i][y*this.chunksize+x-1] = " ";
					}
				}
			}
		}
	},
	
	getChunk: function(col, row) {
		var i = col+','+row;
		return this.chunks[i];
	},
	
	getTile: function(x, y) {
		var col = Math.floor(x/this.chunksize);
		var row = Math.floor(y/this.chunksize);
		
		var chunk = this.getChunk(col, row);
		if(chunk) {
			var inX = x%this.chunksize;
			var inY = y%this.chunksize;
			
			var tile = chunk[inY*this.chunksize+inX];
			
			if(tile) {
				return tile;
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	
	look: function(x, y) {
		var t = this.getTile(x, y);
		if(t==null) {
			var col = Math.floor(x/this.chunksize);
			var row = Math.floor(y/this.chunksize);
			this.createChunk(col, row);
			return this.getTile(x, y);
		} else {
			return t;
		}
	}
}
