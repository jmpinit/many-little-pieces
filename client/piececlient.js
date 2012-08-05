var loaded = false;

//constants
var SYMBOL = {
	W: 11,
	H: 13
}

var SCREEN = {
	W: 0,
	H: 0
}

//resources
var imgFont;
var canvas;

//game data
var text = new Array();

function eventLoaded() {
	imgFont = document.getElementById('img_font');
	canvas = document.getElementById("game_screen");
	
	SCREEN.W = canvas.width/SYMBOL.W;
	SCREEN.H = canvas.height/SYMBOL.H

	//initialize the text array
	for(var y=0; y<SCREEN.W; y++) {
		for(var x=0; x<SCREEN.W; x++) {
			text[y*SCREEN.W+x] = "a";
		}
	}
	
	loaded = true;
}

var PieceClient = Class(function() {
    Maple.Client(this, 30, 60);
}, Maple.Client, {
    started: function() {
		console.log("started");

		//authenticate with server
		client.send(1, [ {name: "nehal", password: "password"} ]);
		client._state = 0;
	},

    update: function(t, tick) {
        console.log(t, tick, this.getRandom());
    },

    render: function(t, dt, u) {
		if(loaded) {
			if(canvas.getContext) {
				var ctx = canvas.getContext('2d');
				
				ctx.clearRect(0, 0, 512, 512);
				
				this.putText(ctx, 10, 10, "a");
				
				/*ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
				ctx.fillRect (30, 30, 55, 50);
				
				ctx.fillRect(0, 0, 100, 100);
				
				ctx.drawImage(imgFont, 0, 0, 11, 13, 0, 0, 11, 13);*/
			}
		}
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
    },
    
    //graphics crap
    putText: function(ctx, x, y, c) {
		var i = c.charCodeAt(0)-32;
		if(i>=0 && i<=94) {
			var row = Math.floor(i/10);
			var col = i-row*10;
			
			alert(row+", "+col);
			
			ctx.drawImage(imgFont, col*SYMBOL.W, row*SYMBOL.H, SYMBOL.W, SYMBOL.H, x, y, SYMBOL.W, SYMBOL.H);
		}
	}
});

var client = new PieceClient();
//client.connect('192.168.137.165', 4000);
client.connect('localhost', 4000);
