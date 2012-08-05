var loaded = false;
var dirty = true;

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
var world = new Array();

function eventLoaded() {
	imgFont = document.getElementById('img_font');
	canvas = document.getElementById("game_screen");
	
	SCREEN.W = canvas.width/SYMBOL.W-1;
	SCREEN.H = canvas.height/SYMBOL.H-1;

	//initialize the text array
	for(var y=0; y<SCREEN.W; y++) {
		for(var x=0; x<SCREEN.W; x++) {
			world[y*SCREEN.W+x] = "a";
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
		if(loaded&&dirty) {
			if(canvas.getContext) {
				var ctx = canvas.getContext('2d');
				
				ctx.clearRect(0, 0, 512, 512);
				
				for(var y=0; y<SCREEN.H; y++) {
					for(var x=0; x<SCREEN.W; x++) {
						this.putText(ctx, x*SYMBOL.W, y*SYMBOL.H, world[y*SCREEN.W+x]);
					}
				}
				dirty = false;
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
			
			ctx.drawImage(imgFont, col*SYMBOL.W, row*SYMBOL.H, SYMBOL.W, SYMBOL.H, x, y, SYMBOL.W, SYMBOL.H);
		}
	}
});

var client = new PieceClient();
//client.connect('192.168.137.165', 4000);
client.connect('localhost', 4000);

function keypress_command(keycode){
	var cmd2 = { name: keycode};
	client.send(2,[cmd2]);
}

$(document.body).keydown( function (evt) {

	switch(evt.keyCode) {
		case 87: // W up
		keypress_command("UP")
		break;
		case 68: // D right
		keypress_command("Right");
		break;
		case 83 : // S down
		keypress_command("Down");
		break;
		case 65 : // A Left
		keypress_command("Left");
		break;
	}
});
