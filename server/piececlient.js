var loaded = false;

//resources
var imgFont;
var cvsGame, cvsInventory, cvsConsole;
var scrnGame, scrnInventory, srcnConsole;
var con;

//game data
var world = new Array();

function eventLoaded() {
	imgFont = document.getElementById('img_font');
	
	cvsGame = document.getElementById("game_screen");
	cvsInventory = document.getElementById("game_inventory");
	cvsConsole = document.getElementById("game_console");
	
	scrnGame = new TextView(cvsGame, Math.floor(cvsGame.width/11), Math.floor(cvsGame.height/13), imgFont, 11, 13);
	scrnInventory = new TextView(cvsInventory, Math.floor(cvsInventory.width/11), Math.floor(cvsInventory.height/13), imgFont, 11, 13);
	scrnConsole = new TextView(cvsConsole, Math.floor(cvsConsole.width/11), Math.floor(cvsConsole.height/13), imgFont, 11, 13);
	
	con = new Console(scrnConsole, function(command) { client.send(6, [ command ]); });
	
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
        //console.log(t, tick, this.getRandom());
    },

    render: function(t, dt, u) {
		if(loaded) {
			scrnGame.render();
			scrnConsole.render();
			scrnInventory.render();
		}
    },

    stopped: function() {
        console.log('stopped');
    },

    connected: function() {
        console.log('connected');
    },

    message: function(type, tick, data) {
        //console.log('message:', data);
		
		if(type==3 && data[0]) {
			var world = JSON.parse(data[1]);
			
			for(var y=0; y<64; y++) {
				for(var x=0; x<64; x++) {
					scrnGame.putText(x, y, world[y*64+x]);
				}
			}
			
			var enemies = JSON.parse(data[0]);
			
			for(var i in enemies) {
				scrnGame.putText(enemies[i].x, enemies[i].y, "*");
			}
			
			scrnGame.dirty = true;
		}
		
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

function keypress_command(keycode){
	var cmd2 = { dir: keycode};
	client.send(2, [cmd2]);
}

$(document).keydown( function (evt) {
	//con.input(evt.keyCode);

	switch(evt.keyCode) {
		case 87: // W up
			keypress_command("U")
			break;
		case 68: // D right
			keypress_command("R");
			break;
		case 83 : // S down
			keypress_command("D");
			break;
		case 65 : // A Left
			keypress_command("L");
			break;
	}
});

