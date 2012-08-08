//WORLD

var World = function(w, h) {
	this.chunks = {
		width: 0,
		height: 0
	}
	this.chunks.width = w;
	this.chunks.height = h;
}

World.prototype = {
	randomize: function() {
		
	},
	
	symSet: function(x, y, c) {
		if(x>=0 && y>=0 && c.length==1) {
			//set a specific position to a value
			//creates a new chunk if one doesn't exist at position
		}
	}
}

//PLAYER

var Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.inventory = "";
}

Player.prototype = {
	
}

//FILE SYSTEM

var FileSystem = function() {
	
}

FileSystem.prototype = {
	
}

//EXPORTS

exports.Player = Player;
