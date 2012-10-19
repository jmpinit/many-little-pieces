function CPU(memSize) {
	this.memSize = memSize*2; //set to # of bytes needed for specified # of 16 bit ints
	
	this.reset();
}

CPU.prototype = {
	tick: function() {
		var src, dest;
		
		switch(this.next(0)) {
			//data and mem
			case "#":	//set reg to immediate
				var val = 0;
				
				//find out how long the number is
				var i = 2;
				var len = 0;
				while(this.next(i).charCodeAt(0)>=48&&this.next(i).charCodeAt(0)<=57) {
					len += 1;
					i += 1;
				}
				
				//decode the number
				for(i-=1; i>=2; i--) {
					val += (this.next(i).charCodeAt(0)-48)*Math.pow(10, len-i+1);
				}
				
				this.setreg(this.next(1), val);
				
				this.pc += 2+len;
				break;
			case ",":	//push
				break;
			case "'":	//pop
				break;
			
			//arithmetic and logic
			case "+":	//add
				dest = this.next(1); src = this.next(2);
				this.setreg(dest, this.getreg(dest)+this.getreg(src));
				this.pc += 3;
				break;
			case "-":	//subtract
				dest = this.next(1); src = this.next(2);
				this.setreg(dest, this.getreg(dest)-this.getreg(src));
				this.pc += 3;
				break;
			case "*":	//multiply
				dest = this.next(1); src = this.next(2);
				this.setreg(dest, this.getreg(dest)*this.getreg(src));
				this.pc += 3;
				break;
			case "/":	//divide
				dest = this.next(1); src = this.next(2);
				this.setreg(dest, this.getreg(dest)/this.getreg(src));
				this.pc += 3;
				break;
			case "%":	//modulo
				dest = this.next(1); src = this.next(2);
				this.setreg(dest, this.getreg(dest)%this.getreg(src));
				this.pc += 3;
				break;
			case "~":	//negate
				src = this.next(1);
				this.setreg(src, ~this.getreg(src));
				this.pc += 2;
				break;
			case "|":	//OR
				dest = this.next(1); src = this.next(2);
				this.setreg(dest, this.getreg(dest)|this.getreg(src));
				this.pc += 3;
				break;
			case "&":	//AND
				dest = this.next(1); src = this.next(2);
				this.setreg(dest, this.getreg(dest)&this.getreg(src));
				this.pc += 3;
				break;
			case "^":	//XOR
				dest = this.next(1); src = this.next(2);
				this.setreg(dest, this.getreg(dest)^this.getreg(src));
				this.pc += 3;
				break;
			
			//control flow
			case "!":	//HALT
				this.pc = 0;
				break;
			case "<":	//skip if less
				break;
			case "=":	//skip if equal
				break;
			case ">":	//skip if greater
				break;
			case "_":	//jump to immediate address
				break;
			case "$":	//jump to relative address
				break;
				
			default:
				this.pc += 1;
		}
	},
	
	next: function(i) {
		return this.code.charAt((this.pc+i)%this.code.length);
	},
	
	regindex: function(reg) {
		reg = reg.toUpperCase();
		var val = reg.charCodeAt(0)-65;
		if(val>=0&&val<26) {
			return val;
		}
		
		return null;
	},
	
	//returns value of named register
	getreg: function(reg) {
		var i;
		if((i = this.regindex(reg))>=0) {
			return this.regView[i];
		}
		
		return null;
	},
	
	//sets value of named register
	setreg: function(reg, val) {
		var i;
		if((i = this.regindex(reg))>=0) {
			this.regView[i] = val;
		}
	},
	
	reset: function() {
		this.code = "#A64#B8%AB!";
	
		this.mem = new ArrayBuffer(this.memSize);
		this.memView = new Int16Array(this.mem);
		
		this.reg = new ArrayBuffer(26*2);
		this.regView = new Int16Array(this.reg);
		
		this.pc = 0;
	}
}
