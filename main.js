var leftitem = document.querySelector(".selling-items-left");
var rightitem = document.querySelector(".selling-items-right");
maxScale = 6.5;
maxPos = leftitem.offsetWidth+15/100*leftitem.offsetWidth;
var positions = [
	{x: maxPos , scale: maxScale, opacity:1, blur: "blur(0.5px)" },
	{x: 67*maxPos/100, scale: 67*maxScale/100, opacity:1, blur: "blur(0px)" },
	{x: 40*maxPos/100, scale: 40*maxScale/100, opacity:0.7, blur: "blur(0.5px)"},
	{x: 20*maxPos/100, scale: 20*maxScale/100, opacity:0.45, blur: "blur(1px)"},
	{x: 7*maxPos/100, scale: 7*maxScale/100, opacity:0.25, blur: "blur(1.5px)"},
	{x: 0, scale: 0, opacity: 0, blur: "blur(2px)"}
];

var items = [
	{
		id: 1,
		name: "Ripped Jacket",
		image: "./item1_ripped_jacket.jpg",
		modelFront: "./model1_front.png",
		price: 2000,
	},{
		id: 2,
		name: "back to front trench dress",
		image: "./item2_back_to_front_trench_dress.jpg",
		modelFront: "./model2_front.png",
		price: 4000,
	},{
		id: 3,
		name: "ripped pants (female)",
		image: "./item3_ripped_pants_female.jpg",
		modelFront: "./model3_front.png",
		price: 7000,
	},{
		id: 4,
		name: "minimum bonded pants",
		image: "./item4_minimal_bonded_pants.jpg",
		modelFront: "./model4_front.png",
		price: 2200,
	},{
		id: 5,
		name: "defile raincoat",
		image: "./item5_defile_raincoat.jpg",
		modelFront: "./model5_front.png",
		price: 2900,
	},{
		id: 6,
		name: "bicker Jacket",
		image: "./item6_bicker_jacket.jpg",
		modelFront: "./model6_front.png",
		price: 200,
	},
];

var topItem = 1;
var itemCount = items.length;

function putData (){
	var ZIndex = 50;

	leftitem.innerHTML = `
		<div class="mouse-input-tab-left"></div>
		<div class="layover-bottom">
			<h3 id="lookNo">LOOK | 1</h3>
			<small>Shop the look</small>
		</div>`;
	rightitem.innerHTML = '';

	items.forEach((item)=>{

		var leftCard = document.createElement("img");
		leftCard.setAttribute("src", item.modelFront);
		leftCard.setAttribute("class", "model");
		leftCard.setAttribute("id", `model-${item.id}`);
		leftCard.setAttribute("style", `z-index: ${ZIndex};`);

		leftitem.appendChild(leftCard);

		var rightCard = document.createElement("div");
		var rightCardBottom = document.createElement("a");
		var rightCardTitle = document.createElement("h5");
		var rightCardPrice = document.createElement("small");
		var hrtImg = document.createElement("i");
		var plusImg = document.createElement("img");

		var titleNode = document.createTextNode(item.name);
		var priceNode = document.createTextNode(`Rs. ${item.price}`);

		rightCardTitle.appendChild(titleNode);
		rightCardPrice.appendChild(priceNode);

		rightCardBottom.appendChild(rightCardTitle);
		rightCardBottom.appendChild(rightCardPrice);
		rightCardBottom.setAttribute("class", "right-card-title");
		rightCardBottom.setAttribute("href", "#item");

		hrtImg.setAttribute("class", "right-card-heart fa fa-heart-o fa-2x");

		plusImg.setAttribute("src", "plus-icon.jpg");
		plusImg.setAttribute("class", "right-card-plus");

		rightCard.appendChild(rightCardBottom);
		rightCard.appendChild(hrtImg);
		rightCard.appendChild(plusImg);
		rightCard.setAttribute("class", "right-card");

		var cardId = `right-card-${item.id}`;
		rightCard.setAttribute("id", cardId );
		rightCard.setAttribute("style", `background-image: url('${item.image}');top: 0;z-index: ${ZIndex};`);
		ZIndex--;

		rightitem.appendChild(rightCard);
	})
	var i=1;
	while( i<= items.length){
		var txt = `#model-${i}`;
		if(i>=positions.length){
			gsap.fromTo(txt,
				{opacity: 0, x: 0,scale: 0, filter: "blur(5px)"},
				{opacity: positions[positions.length-1].opacity, x: positions[positions.length-1].x,delay: 1,duration:1, scale: positions[positions.length-1].scale,  filter: positions[positions.length-1].blur});
		}else{
			gsap.fromTo(txt,
				{opacity: 0, x: 0,scale: 0, filter: "blur(5px)"},
				{opacity: positions[i].opacity, x: positions[i].x,delay: 1,duration:1, scale: positions[i].scale, filter: positions[i].blur});
		}
		i++;
	}
}
putData();

var sellItemBox = document.querySelector(".selling-items");
sellItemBox.addEventListener("mousedown", function(event) {
	sellItemBox.style.cursor = "-webkit-grabbing";
});
sellItemBox.addEventListener("mouseup", function(event) {
	sellItemBox.style.cursor = "-webkit-grab";
});
