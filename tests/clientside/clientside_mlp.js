//UI
var imgFont;
var cvsConsole, cvsGame, cvsInventory;
var srcnConsole, scrnGame, scrnInventory;
var con;

var focus = "game";

//GAME
var world;

function eventLoaded() {
	//setup the UI
	imgFont = document.getElementById('img_font');
	
	cvsGame = document.getElementById("game_screen");
	cvsInventory = document.getElementById("game_inventory");
	cvsConsole = document.getElementById("game_console");
	
	scrnConsole = new TextView(cvsConsole, Math.floor(cvsConsole.width/10), Math.floor(cvsConsole.height/12), imgFont, 10, 12);
	scrnGame = new TextView(cvsGame, Math.floor(cvsGame.width/10), Math.floor(cvsGame.height/12), imgFont, 10, 12);
	scrnInventory = new TextView(cvsInventory, Math.floor(cvsInventory.width/10), Math.floor(cvsInventory.height/12), imgFont, 10, 12);
	
	con = new Console(scrnConsole, function(code) {
		var result = "something went wrong...";
		try {
			result = JSON.stringify(maskedEval('"use strict";'+code));
			if(typeof result == 'undefined') {
				result = "undefined";
			}
		} catch(error) {
			result = error.message;
		}
		
		con.newline();
		for(var i=0; i<result.length; i++) {
			con.print(result.charAt(i));
		}
		con.newline();
	});
	
	//setup the world
	world = new World();
	for(var y=0; y<scrnGame.height; y++) {
		for(var x=0; x<scrnGame.width; x++) {
			scrnGame.putText(x, y, world.look(x, y));
		}
	}
	
	setInterval(function() {
		scrnConsole.render();
		scrnGame.render();
		scrnInventory.render();
	}, 10);
}

$(document).keydown( function (evt) {
	if(focus=="console") {
		if(evt.keyCode==8) {
			con.input(evt.keyCode);
		}
	} else {
		switch(evt.keyCode) {
			case 87: // W up
				
				break;
			case 68: // D right
				
				break;
			case 83 : // S down
				
				break;
			case 65 : // A Left
				
				break;
		}
	}
});

$(document).keypress( function (evt) {
	if(focus=="console") {
		con.input(evt.keyCode);
	}
});

function maskedEval(scr){
	var mask = {};
	for (p in this)
		mask[p] = undefined;
	
	(new Function('with(this) { "use strict"; ' + scr + '}')).call(mask);
}

function focusOnConsole() { focus = "console"; }
function focusOnGame() { focus = "game"; }
