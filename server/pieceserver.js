var Maple = require('../Maple/Maple');
var game = require("./piecegame.js");

//CONSTANTS
const WORLD = {
	CHUNK_SIZE: {
		W: 16,
		H: 16
	}
}

var world, players;

var PieceServer = Maple.Class(function(clientClass) { Maple.Server(this, clientClass); },
	Maple.Server, {
	
	started: function() {
		info('started');
		
		//create the world
		world = new game.World(WORLD.CHUNK_SIZE.W, WORLD.CHUNK_SIZE.H);
		world.randomize();
		
		info("initialized");
	},

	update: function(t, tick) {
		//process the next batch of virtual machines from the queue
		
		//process the next batch of actions from the queue
	},

	stopped: function() {
		info('stopped');
	},

	connected: function(client) {
		console.log('CONNECTED:', client.id);
		
		//associate player with an old account or create a new account
	},

	message: function(client, type, tick, data) {
		switch(type) {
			case protocol.COMMAND:
				//add the proper command to the queue
				break;
			case protocol.INFO:
				//send the requested information
				break;
		}
	},
	
	requested: function(req, res) {
		info('HTTP Request - ',req);
	},

	disconnected: function(client) {
		console.log('DISCONNECTED:', client.id);
	}
});

function info(msg) { console.log("INFO: "+msg); }

var protocol = {
	COMMAND: 1,	//player action
	INFO: 2		//stats
};

var srv = new PieceServer();
srv.start({
	port: 4000,
	logicRate: 100
});
