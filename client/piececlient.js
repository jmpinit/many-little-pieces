var PieceClient = Class(function() {
    Maple.Client(this, 30, 60);
}, Maple.Client, {
    started: function() {
        console.log("started");
	client.send(1, [ {name: "nehal", password: "password"} ]);
        client._state = 0;
    },

    update: function(t, tick) {
        console.log(t, tick, this.getRandom());
    },

    render: function(t, dt, u) {
		
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
        return true; // return true to mark this message as handled
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
