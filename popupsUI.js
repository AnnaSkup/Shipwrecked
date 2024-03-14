const createPopupCard = function(card){
	if(card == null) return;
	const container = document.createElement("div");
	container.className = "popup disappear";
	const popupId = Math.random();
	container.setAttribute("popupId",popupId);
	container.setAttribute("onClick","popupOnClick(this)");
	
	const title = document.createElement("div");
	const img = document.createElement("img");
	img.className = "main";
	img.setAttribute("src","images\\"+card.img);
	title.appendChild(img);
	const tit = document.createElement("span");
	tit.textContent = card.title;
	tit.className = "textTitle";
	title.appendChild(tit);
	container.appendChild(title);
	
	const desc = document.createElement("span");
	desc.className = "textDesc";
	desc.textContent = card.desc;
	container.appendChild(desc);
	
	const popupCont = document.getElementsByClassName("popupCont")[0];
	const existingPopups = popupCont.getElementsByClassName("popup");
	if(existingPopups.length > 0){
		for(let p of existingPopups){p.remove();}
	}
	popupCont.appendChild(container);
	setTimeout(()=>{
		if(container != null)
			container.className = "popup";
		setTimeout(()=>{
			const items = document.querySelectorAll("[popupId='"+popupId+"']");
			if(items.length > 0){
				for(let i of items){
					i.className = "popup disappear";
				}
				setTimeout(()=>{
					const items = document.querySelectorAll("[popupId='"+popupId+"']");
					if(items.length > 0){
						for(let i of items){
							i.remove();
						}
					}
				},1000);
			}
		},5000);
	},1);
	
}

const popupOnClick = function(self){
	self.remove();
}

clearAllPopups = function(){
	const popupCont = document.querySelector(".popupCont");
	const existingPopups = popupCont.getElementsByClassName("popup");
	if(existingPopups.length > 0){
		for(let p of existingPopups){p.remove();}
	}
}