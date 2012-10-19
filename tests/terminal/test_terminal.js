//resources
var imgFont;
var cvsConsole;
var srcnConsole;
var con;

function eventLoaded() {
	imgFont = document.getElementById('img_font');
	
	cvsConsole = document.getElementById("game_console");
	scrnConsole = new TextView(cvsConsole, Math.floor(cvsConsole.width/10), Math.floor(cvsConsole.height/12), imgFont, 10, 12);
	con = new Console(scrnConsole, function(command) { });
	
	setInterval(function() {scrnConsole.render()}, 10);
}

$(document).keydown( function (evt) {
	if(evt.keyCode==13 || evt.keyCode==8) {
		con.input(evt.keyCode);
	}
});

$(document).keypress( function (evt) {
	con.input(evt.keyCode);
});
