var row = 25;
var col = 25;
var g = 20;

var s;
var f;

function Snake() {
	this.x = 12;
	this.y = 12;
	this.sx = 0;
	this.sy = 0;
	this.body = [[this.x, this.y]];
	this.ss = 1;
	
	this.dead = false;
	
  
	this.isDead = function() {
		return this.dead;
	}
	
  
	this.length = function() {
		return this.body.length;
	}
	
  
	this.update = function() {
		this.x = constrain(this.x + this.sx, -1, col);
		this.y = constrain(this.y + this.sy, -1, row);
		
		if (this.x < 0 || this.y < 0 || this.x == col || this.y == row) {
			this.dead = true;
			return;
		}
		
		if (this.contains(createVector(this.x, this.y), 3)) {
			this.dead = true;
			return;
		}
		
		this.body.pop();
		this.body.unshift([this.x, this.y]);
	};
	
  
	this.setDir = function(dx, dy) {
		if (this.length() > 1) {
			if (dx !== 0 && dx === -this.sx || 
					dy !== 0 && dy === -this.sy) return;
		}
		this.sx = dx;
		this.sy = dy;
	}
	
  
	this.draw = function() {
		fill(255);
		for (var i = 1; i < this.body.length; ++i) {
			rect(this.body[i][0] * g, this.body[i][1] * g, g, g);
		}
		fill(0, 0, 255);
		rect(this.body[0][0] * g, this.body[0][1] * g, g, g);
	};
	

	this.canEat = function(v) {
		return (this.x === v.x && this.y === v.y);
	}
	
  
	this.eat = function() {
		this.body.push([this.x, this.y]);
	}
	
  
	this.contains = function(v, s) {
		for (var i = s || 0; i< this.body.length; ++i) {
			if(this.body[i][0] === v.x && 
				 this.body[i][1] === v.y){
				return true;	 
			}
		}
		return false;
	}
}


function generateFood() {
	while (true) {
	  f = createVector(floor(random() * col), floor(random() * row));
	  if (!s.contains(f)) break;
	}
											 
}


function setup() {
  createCanvas(row * g, col * g);
	frameRate(10);
	s = new Snake();
	generateFood();
}


function draw() {
  background(30);
	
	if(!s.isDead()) {
		s.update();
		if (s.canEat(f)) {
			s.eat(f);
			generateFood();
		}
		
		frameRate(10 + s.length() / 2);
	}
	
	s.draw();
	
	fill(255, 0, 0);
	rect(f.x * g, f.y * g, g, g);
	
	if (s.isDead()) {
		textSize(32);
		textAlign(CENTER);
		fill(255, 0, 255);
		text('Game Over', col * g / 2, row * g /2 );
		textSize(16);
		fill(255, 255, 0);
		text('Press ENTER to restart', col * g / 2, row * g / 2 + 2 * g);
	}
}


function keyPressed() {
	if(keyCode === RIGHT_ARROW) {
		s.setDir(1, 0);
	} else if (keyCode === LEFT_ARROW) {
		s.setDir(-1, 0);
	} else if (keyCode === UP_ARROW) {
		s.setDir(0, -1);
	} else if (keyCode === DOWN_ARROW) {
		s.setDir(0, 1);
	} else if (keyCode === ENTER) {
		if (s.isDead()) {
			setup();
		}
	}
}
