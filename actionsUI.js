const createActionElement = function(action){
	const actContainer = document.createElement("div");
	actContainer.addEventListener("click",(event)=>{
		console.log(event);
		if(!event.target.className.includes('collect')){
			if(mainSlot != null){
				cardStore.push(mainSlot);
				mainSlot = null;
			}
			while(additionalSlots.length > 0){
				cardStore.push(additionalSlots.pop());
			}
			showAction(action);
		}
	});
	actContainer.setAttribute("elementId",action.elementId);
	actContainer.className = "actionContainer";
	if(action.actionData.isEnd)
		actContainer.className += " isend";
	if(action.actionData.color)
		actContainer.style.backgroundColor = action.actionData.color;
	
	const title = document.createElement("span");
	title.textContent = action.actionData.title;
	title.className="title";
	actContainer.appendChild(title);
	
	const storedCards = document.createElement('div');
	storedCards.className = "storedCards";
	for (let card of action.cardList){
		const img = document.createElement("img");
		img.setAttribute("src","images\\"+card.img);
		img.setAttribute("cardid",card.id);
		storedCards.appendChild(img);	
	}
	actContainer.appendChild(storedCards);
	
	const timer = document.createElement("div");
	timer.className = "timer";
	const timerFill = document.createElement("div");
	timerFill.className = "fill";
	
	const collectButton = document.createElement('span');
	collectButton.className = "collect";
	collectButton.textContent = "Collect";
	
	collectButton.addEventListener("click",()=>{
			console.log("button click");
			onCloseAction(action);
			shownRecipeChange(null);
		});
	actContainer.appendChild(collectButton);

	const completionPercentage = action.getCompletionPercentage();
	timerFill.style.width = (100 * completionPercentage).toString()+"%";
	const timeDurationSeconds = (action.actionData.time * (1 - completionPercentage) * 0.001);
	timer.appendChild(timerFill);
	actContainer.appendChild(timer);
	
	const timerText = document.createElement("span");
	timerText.textContent = formatFloat(timeDurationSeconds)+"s";
	timerText.className = "timerText";
	actContainer.appendChild(timerText);
	
	return actContainer;
}

const redrawAction = function(actionElement, action){
	if(action.actionData.isEnd){
		if(!actionElement.className.includes("isend")){
			actionElement.className += " isend";
		}
	}else{
		if(actionElement.className.includes("isend")){
			actionElement.className = actionElement.className.replaceAll("isend","");
		}
		const timerText = actionElement.querySelector(".timerText");
		const timerFill = actionElement.querySelector(".fill");
		
		const completionPercentage = action.getCompletionPercentage();
		timerFill.style.width = (100*completionPercentage).toString()+"%";
		const timeDurationSeconds = (action.actionData.time * (1 - completionPercentage) *0.001);
		timerText.textContent = formatFloat(timeDurationSeconds)+"s";
	}
	
	if(action.actionData.color){
		actionElement.style.backgroundColor = action.actionData.color;
	}
	
	const title = actionElement.querySelector(".title");
	if(title.textContent != action.actionData.title)
		title.textContent = action.actionData.title;
	
	const storedCards = actionElement.querySelector(".storedCards");
	const existingImgs = new Set();
	const childrenArray = Array.from(storedCards.children);
	for(let cardimg of childrenArray){
		const cardid = parseInt(cardimg.getAttribute("cardid"));
		if(action.cardList.findIndex(x => x.id == cardid) < 0){
			cardimg.remove();
		}else{
			existingImgs.add(cardid);
		}
	}
	for(let card of action.cardList){
		if(!existingImgs.has(card.id)){
			const img = document.createElement("img");
			img.setAttribute("src","images\\"+card.img);
			img.setAttribute("cardid",card.id);
			storedCards.appendChild(img);		
		}
	}
}

const addActionToUI = function(action){
	const elem = createActionElement(action);
	const actionContainer = document.getElementsByClassName("right")[0];
	actionContainer.appendChild(elem);
}

const redrawActions = function(){
	const actionsContainer = document.getElementsByClassName("right")[0];
	const actionListIds =  actionsList.map(x => x.elementId);
	const elemIds = Array.from(actionsContainer.children).map(x => x.getAttribute("elementId"));
	const actionListIdsSet = new Set(actionListIds);
	for(const action of actionsList){
		if(!actionListIdsSet.has(action.elementId)){
			actionsContainer.appendChild(createActionElement(action));
		}
	}
	const actionsToRemove = elemIds.filter(x => actionListIds.findIndex(a => a == x) < 0);
	for(const elementId of actionsToRemove){
		const actionElement = actionsContainer.querySelector("[elementid='"+elementId+"']");
		if(actionElement != null)
			actionElement.remove();
	}
	for(const actionElement of actionsContainer.children){
		const elementId = actionElement.getAttribute("elementId");
		const action = actionsList.find(x => x.elementId == elementId);
		if(action != null){
			redrawAction(actionElement,action);	
		}
	}
}

const clickPauseButton = function(elem){
	const paused = elem.getAttribute("paused");
	if(paused == "true"){
		togglePause(false);
		elem.setAttribute("paused",false);
		elem.querySelector("img").setAttribute("src","images\\stop.svg");
	}else{
		togglePause(true);
		elem.setAttribute("paused",true);
		elem.querySelector("img").setAttribute("src","images\\go.svg");
	}
}

const clickSpeedButton = function(elem){
	let speeded = elem.getAttribute("speeded");
	switch(speeded){
		case "fastest":
			speeded = "no";
			break;
		case "fast":
			speeded = "fastest"; break;
		default:
			speeded = "fast"; break;
	}
	elem.setAttribute("speeded",speeded);
	switch(speeded){
		case "fastest":
			speedMultiplier = 0.05;
			break;
		case "fast":
			speedMultiplier = 0.2; break;
		default:
			speedMultiplier = 1.0; break;
		
	}
}

const onKeyPress = function(event){
	switch(event.code){
		case "Space":
		{
			const btn = document.querySelector("div.pause");
		clickPauseButton(btn);
		}
		break;
	}
}