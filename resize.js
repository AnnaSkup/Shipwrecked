let resizeTopOffset = 200;
let resizeHorizontalOffset = 400;

let resizingTop = false;
let resizingHorizontal = false;
const resizerTop = function(resize){
	resizingTop = resize;
}
const resizerMouseMove = function(event){
	if(resizingTop){
		resizeTopOffset += event.movementY;
		if(resizeTopOffset < 0){
			resizeTopOffset = 0;
			}
		document.getElementsByClassName("upper")[0].style.height = resizeTopOffset + "px";
		document.getElementsByClassName("lower")[0].style.height = "calc(100% - " + (resizeTopOffset + 60) + "px)";
	}
}
const checkSize = function(){
	resizeHorizontalOffset = document.querySelector(".lower .left").clientWidth;
}

const resizeHorizontal = function(resize){
	resizingHorizontal = resize;
}
const resizerHorizontalMouseMove = function(event){
	if(resizingHorizontal){
		resizeHorizontalOffset += event.movementX;
		console.log(event.movementX);
		if(resizeHorizontalOffset < 90){
			resizeHorizontalOffset = 100;
		}
		document.querySelector(".lower .left").style.width = resizeHorizontalOffset + "px";
		document.querySelector(".lower .right").style.width = "calc(100% - " + (resizeHorizontalOffset + 10) + "px)";
	}
}

const toggleCardSize = function(mode){
	
	const cardCont = document.getElementsByClassName("cardCont")[0];
	if(mode != "big"){
		if(cardCont.classList.contains("big"))
			cardCont.className = cardCont.className.replaceAll("big","");
		if(!cardCont.classList.contains("small"))
			cardCont.className+="small"
	}else{
		if(cardCont.classList.contains("small"))
			cardCont.className = cardCont.className.replaceAll("small","");
		if(!cardCont.classList.contains("big"))
			cardCont.className+="big"
	}
}