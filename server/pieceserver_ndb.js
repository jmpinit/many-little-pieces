var Maple = require('../Maple/Maple');

var plasma = {
	enabled: false,
	time: 0,
	heightmap: " .'`,^:+';~-_+<>i!lI?/|()1{}[]rcvunxzjftLCJUYXZO0Qoahkbdpqwm*WMB8&%$#@"
}

var world = new Array();

var players = new Array();

function Player(x, y) {
	this.x = x;
	this.y = y;
	this.inventory = "";
}

Player.prototype = {
	
}

players[0] = new Player(0, 0);

var PieceServer = Maple.Class(function(clientClass) {
	Maple.Server(this, clientClass);

}, Maple.Server, {

	started: function() {
		console.log('Started');
		
		//create the world
		for(var y=0; y<64; y++) {
			for(var x=0; x<64; x++) {
				if(Math.random()*100>90) {
					world[y*64+x] = String.fromCharCode(Math.floor(32+Math.random()*94));
				} else {
					world[y*64+x] = " ";
				}
			}
		}
		
		/*world.getPos = function(x, y) {
			return world[y*512+x];
		}*/
	},

	update: function(t, tick) {
		enemies = new Array();
		for(var i in players) {
			enemies[enemies.length] = players[i];
		}
		this.broadcast(3, [JSON.stringify(enemies), JSON.stringify(world)]);
		
		if(plasma.enabled) {
			for(var y=0; y<64; y++) {
				for(var x=0; x<64; x++) {
					var t = plasma.time;
					var d = function(x1, y1, x2, y2) { return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2)); }
					var p1 = (Math.sin(x/(8*Math.cos(t/16)))+1);
					var p2 = (Math.sin(d(12+8*Math.cos(t/8), 12+8*Math.sin(t/8), x, y)/32)+1);
					var i = Math.floor(plasma.heightmap.length*((p1+p2)/4));
					world[y*64+x] = plasma.heightmap.charAt(i);
				}
			}
			
			plasma.time += Math.PI/32;
		}
	},

	stopped: function() {
		console.log('Stopped');
	},

	connected: function(client) {
		console.log('Connected:', client.id);
		players[client.id] = new Player(3, 3);
	},

	message: function(client, type, tick, data) {
		switch(type) {
			case protocol.type.INIT:
				
				break;
			case protocol.type.COMMAND:
				switch(data[0].dir){
					case "U": // W up
						players[client.id].y--;
						break;
					case "R": // D right
						players[client.id].x++;
						break;
					case "D" : // S down
						players[client.id].y++;
						break;
					case "L" : // A Left
						players[client.id].x--;
						break;
				}
				
				var tile = world[players[client.id].y*64+players[client.id].x];
				if(tile!=" ") {
					players[client.id].inventory += tile;
					world[players[client.id].y*64+players[client.id].x] = " ";
				}
				
				console.log("player "+client.id+" is now at ("+players[client.id].x+", "+players[client.id].y+")");
				
				break;
			case protocol.type.CONSOLE:
				console.log(data[0]);
				switch(data[0]) {
					case "PLASMA":
						plasma.enabled = true;
						break;
					case "RAND":
						for(var y=0; y<64; y++) {
							for(var x=0; x<64; x++) {
								if(Math.random()*100>90) {
									world[y*64+x] = String.fromCharCode(Math.floor(32+Math.random()*94));
								} else {
									world[y*64+x] = " ";
								}
							}
						}
						break;
					case "CLEAR":
						for(var y=0; y<64; y++) {
							for(var x=0; x<64; x++) {
								world[y*64+x] = " ";
							}
						}
						break;
					case "RICK":
						var song = "We're no strangers to love You know the rules and so do I A full commitments what Im thinking of You wouldn't get this from any other guy I just wanna tell you how I'm feeling Gotta make you understand Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you";
						
						var x = 0;
						var y = 0;
						for(var i=0; i<song.length; i++) {
							world[y*64+x] = song.charAt(i);
							x++;
							if(x>64) { y++; x=0; }
						}
						break;
				}
				
				break;
			
		}
	},
	
	requested: function(req, res) {
		console.log('HTTP Request');
	},

	disconnected: function(client) {
		console.log('Disconnected:', client.id);
	}
});

var protocol = {
	type: {
		INIT: 1,
		COMMAND: 2,
		WORLD: 3,
		CONSOLE: 4
	},
	
	cmd: {
		MOVE: 1,
		MINE: 2
	},
	
	dir: {
		NA: 0, // meaning doesn't apply
		UP: 1,
		DOWN: 2,
		LEFT: 3,
		RIGHT: 4
	}
};

var world_info = {
	SCREEN_W: 32,
	SCREEN_H: 32,
};

var srv = new PieceServer();
srv.start({
	port: 4000,
	logicRate: 1
});
