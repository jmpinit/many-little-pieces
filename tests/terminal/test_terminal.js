var loaded = false;

//resources
var imgFont;
var cvsGame, cvsConsole;
var scrnGame, srcnConsole;
var con, inventory;
var focus = "game";

function eventLoaded() {
	imgFont = document.getElementById('img_font');
	
	cvsGame = document.getElementById("game_screen");
	cvsConsole = document.getElementById("game_console");
	
	//scrnGame = new TextView(cvsGame, Math.floor(cvsGame.width/11), Math.floor(cvsGame.height/13), imgFont, 10, 12);
	scrnConsole = new TextView(cvsConsole, Math.floor(cvsConsole.width/10), Math.floor(cvsConsole.height/12), imgFont, 10, 12);
	
	con = new Console(scrnConsole, function(command) { client.send(4, [ command ]); });
	
	loaded = true;
	
	setInterval(function() {scrnConsole.render()}, 10);
}

function focusOnConsole() { focus = "console"; }
function focusOnGame() { focus = "game"; }

function keypress_command(keycode) {
	var cmd2 = { dir: keycode };
	client.send(2, [cmd2]);
}

$(document).keydown( function (evt) {
	if(focus=="console") {
		con.input(evt.keyCode);
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
