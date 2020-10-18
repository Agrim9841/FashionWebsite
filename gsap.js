gsap.from(".mainbody",{x: -20, opacity: 0, duration: 1});

function goUp(durationVal, delayVal){
	if(topItem<itemCount){
		var inTest1 = `#right-card-${topItem}`;
		topItem++;
		var inTest2 = `#right-card-${topItem}`;
		gsap.fromTo( inTest1 ,
			{y: 0},
			{y: '-100%', duration: 0.5, delay: delayVal, ease:Linear.easeNone});
		gsap.fromTo( inTest2 ,
			{y: '100%'},
			{y: 0, duration: 0.5, delay: delayVal, ease:Linear.easeNone});
		document.querySelector("#lookNo").innerHTML=`LOOK | ${topItem}`;
	}
}

function goDown(durationVal, delayVal){
	if(topItem>1){
		var inTest1 = `#right-card-${topItem}`;
		topItem--;
		var inTest2 = `#right-card-${topItem}`;
		gsap.fromTo( inTest1 ,
			{y: 0},
			{y: '100%', duration: durationVal, delay: delayVal, ease:Linear.easeNone});
		gsap.fromTo( inTest2 ,
			{y: '-100%'},
			{y: 0, duration: durationVal, delay: delayVal, ease:Linear.easeNone});
		document.querySelector("#lookNo").innerHTML=`LOOK | ${topItem}`;
	}
}

function goRight(durationVal, delayVal){
	if(topItem<itemCount){
		for(var i=1;i<=5;i++){
			if(items[topItem-2+i]){
				var lnTest1 = `#model-${topItem-1+i}`;
				gsap.fromTo( lnTest1 ,
					{opacity: positions[i].opacity, x: positions[i].x,scale: positions[i].scale, filter: positions[i].blur},
					{opacity: positions[i-1].opacity, x: positions[i-1].x,delay: delayVal, duration: durationVal, scale: positions[i-1].scale, ease:Linear.easeNone, filter: positions[i-1].blur});
			}
		}
	}
	goUp(durationVal, delayVal);
}

function goLeft(durationVal, delayVal){
	if(topItem>1){
		for(var i=1;i<=5;i++){
			if(items[topItem-3+i]){
				var lnTest1 = `#model-${topItem+i-2}`;
				gsap.fromTo( lnTest1 ,
					{opacity: positions[i-1].opacity, x: positions[i-1].x,scale: positions[i-1].scale, filter: positions[i-1].blur},
					{opacity: positions[i].opacity, x: positions[i].x,duration: durationVal, delay: delayVal, scale: positions[i].scale, ease:Linear.easeNone, filter: positions[i].blur});
			}
		}
	}
	goDown(durationVal, delayVal);
}

var mouseDown = false;
var X = 0;
var Y = 0;

rightitem.addEventListener("mouseout", function(event) {
	X = 0;
	Y = 0;
});

rightitem.addEventListener("mousedown", function(event) {
	if(mouseDown == false){
		X = event.offsetX;
		Y = event.offsetY;
		mouseDown = true;
	}
});

rightitem.addEventListener("mouseup", function(event) {
	if(Math.abs(Y-event.offsetY)>40){
		if(Y > event.offsetY){
			goRight(0.5, 0);
		}else if(Y < event.offsetY){
			goLeft(0.5, 0);
		}
	}else{
		window.location.href = "#item-detail";
	}
	
	if(mouseDown == true){
		mouseDown = false;
	}
	x = 0;
	Y = 0;
});

leftitem.addEventListener("mouseout", function(event) {
	X = 0;
	Y = 0;
});

leftitem.addEventListener("mousedown", function(event) {
	if(mouseDown == false){
		X = event.offsetX;
		Y = event.offsetY;
		mouseDown = true;
	}
});

leftitem.addEventListener("mouseup", function(event) {
	if(Math.abs(X-event.offsetX)>40){
		if(Math.abs(X-event.offsetX)>leftitem.offsetWidth/3){
			if(X > event.offsetX){
				goLeft(0.25, 0);
				goLeft(0.25, 0.25);
			}else if(X < event.offsetX){
				goRight(0.25, 0);
				goRight(0.25, 0.25);
			}
		}else{
			if(X > event.offsetX){
				goLeft(0.5, 0);
			}else if(X < event.offsetX){
				goRight(0.5, 0);
			}
		}
		
	}
	
	if(mouseDown == true){
		mouseDown = false;
	}
	x = 0;
	Y = 0;
});

document.querySelector("body").onresize = function(){
	maxPos = leftitem.offsetWidth+15/100*leftitem.offsetWidth;
	positions = [
		{x: maxPos , scale: maxScale, opacity:1, blur: "blur(0.5px)" },
		{x: 67*maxPos/100, scale: 67*maxScale/100, opacity:1, blur: "blur(0px)" },
		{x: 40*maxPos/100, scale: 40*maxScale/100, opacity:0.7, blur: "blur(0.5px)"},
		{x: 20*maxPos/100, scale: 20*maxScale/100, opacity:0.45, blur: "blur(1px)"},
		{x: 7*maxPos/100, scale: 7*maxScale/100, opacity:0.25, blur: "blur(1.5px)"},
		{x: 0, scale: 0, opacity: 0, blur: "blur(2px)"}
	];
	putData();
	topItem = 1;
};
