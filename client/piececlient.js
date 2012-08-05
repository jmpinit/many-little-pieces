//check for being fully loaded
//this.ready = false;
//window.addEventListener("load", function(this.ready=true;); 

var PieceClient = Class(function() {
    Maple.Client(this, 30, 60);
}, Maple.Client, {
    started: function() {
        console.log("started");
		client.send(1, [ {name: "nehal", password: "password"} ]);
        client._state = 0;
        
        imgFont = new Image();
		imgFont.src = "imgs/the_pieces.png";
    },

    update: function(t, tick) {
        console.log(t, tick, this.getRandom());
    },

    render: function(t, dt, u) {
		ctx.drawImage(character, player.sx, player.sy, player.w, player.h, player.x, player.y, player.w, player.h);
    },

    stopped: function() {
        console.log('stopped');
    },

    connected: function() {
        console.log('connected');
    },

    message: function(type, tick, data) {
        console.log('message:', type, tick, data);
		var cmd = { name: "success"};
		client.send(2, [ cmd ]);
        return true;
    },

    syncedMessage: function(type, tick, data) {
        console.log('synced message:', type, tick, data);
    },

    closed: function(byRemote, errorCode) {
        console.log('Closed:', byRemote, errorCode);
    }
});

var client = new PieceClient();
//client.connect('192.168.137.165', 4000);
client.connect('localhost', 4000);
