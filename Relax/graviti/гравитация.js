let cnv = document.querySelector('canvas');
let ctx = cnv.getContext('2d');

let width = 400;
let height = 500;
cnv.style.backgroundColor = 'rgb(0,0,0)'
cnv.width = width;
cnv.height = height;


ctx.strokeStyle = 'rgb(255,255,255)'
ctx.lineWidth = 5;

let clear = function(){
	ctx.clearRect(0,0,width,height)
}
let fillRect = function (x, y, w, h) {
	ctx.fillRect(x, y, w, h)
}

let strokeRect = function (x, y, w, h) {
	ctx.strokeRect(x, y, w, h)
}

let Rect = function (x, y, w, h) {
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	this.dx = 0;
	this.dy = 0;
	this.max = 10;
	this.dd = 0.1;
	this.fall = true;
}
Rect.prototype = {
	draw: function () {
		fillRect(this.x, this.y, this.w, this.h)
	},
	move: function(){
		this.x += this.dx
		this.y += this.dy
	},
	grav: function(){
		
		  if(this.y+this.h >=height-100){
		  	this.max = 2;
		 	this.dy /= 1.5;
		  }
		  if(this.dy>this.max){
		  	this.dy = 0;
		  }
		 if(!this.fall) return;
		
		this.dy += this.dy <= this.max?this.dd:0;
		if(this.y+this.h>=height){
			this.y = height-this.h
			this.dy/=2
			this.dy*=-1
			
		};
		
		if(Math.abs(this.dy)<this.dd*2 && this.y+this.h >= height){
			this.fall = false;
			this.dy = 0;
		}
		
		
	}
};

let rect = [];

let mouse = {
	x:0,
	y:0
}

cnv.onmousemove = function(e){
mouse.x = e.pageX-10;
mouse.y = e.pageY-10;
}

cnv.onclick = function(){
	rect.push(new Rect(mouse.x-20,mouse.y-20,40,40))
}

setInterval(function () {
	clear();
	ctx.globalAlpha = 1;
	ctx.fillStyle = 'yellow'
	for (let elem of rect) {
		elem.grav()
		elem.move();
		elem.draw();
	}
	strokeRect(mouse.x-20,mouse.y-20,40,40);
	ctx.globalAlpha = 0.3;
	ctx.fillStyle = 'rgb(12,150,200)'
	ctx.fillRect(0,height-100,width,100)
	ctx.fillStyle = 'rgb(12,150,255)'
	ctx.fillRect(0,height-100,width,40)
}, 1000 / 60)

