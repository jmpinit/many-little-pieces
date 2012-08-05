var Maple = require('../Maple/Maple');

/*var db = require('mongojs').connect('pieces');
var world = db.collection('world');

//drop the existing chunks
world.drop();

//create some chunks
for(var y=0; y<8; y++) {
	for(var x=0; x<8; x++) {
		var chunkform = { loc: { x: 0, y: 0 }, data: "" };
		chunkform.x = x;
		chunkform.y = y;
		
		for(var i=0; i<32*32; i++) { chunkform.data += String.charFromCode(Math.floor(Math.random()*97+32));
		world.save(chunk);
	}
}

console.log("things happened");*/

var PieceServer = Maple.Class(function(clientClass) {
	Maple.Server(this, clientClass);

}, Maple.Server, {

	started: function() {
		console.log('Started');
	},

	update: function(t, tick) {
		this.broadcast(5, ['Hello World']);
		//console.log(this.getClients().length, 'client(s) connected', t, tick, this.getRandom());
	},

	stopped: function() {
		console.log('Stopped');
	},

	connected: function(client) {
		console.log('Connected:', client.id);
	},

	message: function(client, type, tick, data) {
		//console.log('Message:', client, type, tick);
		console.log('Message:', data);
		switch(type) {
			case protocol.INIT:
				this.broadcast(protocol.INIT, "test", [client]);
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
	INIT: 1
};

var srv = new PieceServer();
srv.start({
	port: 4000,
	logicRate: 100
});

