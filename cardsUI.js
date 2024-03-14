const createCardElement = function(card){
	const elem =  document.createElement("div");
	elem.className = "cardContainer";
	elem.setAttribute("cardid",card.id);
	elem.setAttribute("onclick","onCardClick(this);");
	elem.setAttribute("ondblclick","onCardDBClick(this);");
	const img = document.createElement("img");
	img.setAttribute("src","images\\"+card.img);
	elem.appendChild(img);
	const counter = document.createElement("div");
	counter.className = "counter";
	if(card.amount > 1){
		let span = document.createElement("span");
		span.textContent = card.amount.toString();
		counter.appendChild(span);
	}
	elem.appendChild(counter);
	const timer = document.createElement('span');
	timer.className = "timer";
	if(card.expiryTime > 0){
		timer.textContent = formatFloat(card.getRemainingSeconds()).toString()+"s";
	}
	elem.appendChild(timer);
	return elem;
}

drawAllCards = function(){
	const cardCont = document.getElementsByClassName("cardCont")[0];
	const cardStoreIds = cardStore.map(x => x.id);
	const cardContIds = Array.from(cardCont.children).map(x => parseInt(x.getAttribute("cardid")));
	const cardContIdsSet = new Set(cardContIds);
	for(const card of cardStore){
		if(!cardContIdsSet.has(card.id)){
			cardCont.appendChild(createCardElement(card));
		}
	}
	const cardsToRemove = cardContIds.filter(x => cardStoreIds.findIndex(a => a == x) < 0);
	for(const cardId of cardsToRemove){
		const cardElem = cardCont.querySelector("[cardid='"+cardId+"']")
		if(cardElem != null)
			cardElem.remove();
	}
}

redrawTimedCards = function(){
	const cardCont = document.getElementsByClassName("cardCont")[0];
	const timedCards = cardStore.filter(x => x.expiryTime > 0);
	const timedCardsIds = new Set(timedCards.map(x => x.id));
	const timedCardElems = Array.from(cardCont.children).filter(x => timedCardsIds.has(parseInt(x.getAttribute("cardid"))));
	for(let timedCard of timedCardElems){
		const timer = timedCard.querySelector(".timer");
		const cardId = parseInt(timedCard.getAttribute("cardid"));
		const card = timedCards.find(x => x.id == cardId);
		if(card != null){
			timer.textContent = formatFloat(card.getRemainingSeconds()).toString()+"s";
		}
	}
}

const onCardClick = function(elem){
	const cardId = parseInt(elem.getAttribute("cardid"));
	const card = cardStore.find(x => x.id == cardId);
	createPopupCard(card);
}

const onCardDBClick = function(elem){
	clearAllPopups();
	const cardid = elem.getAttribute("cardid");
	const card = cardStore.find(x => x.id == cardid);
	if(mainSlot != null){
		const recipe = getRecipe();
		if(recipe.additionalSpaces > additionalSlots.length){
			additionalSlots.push(card);
		}else{
			cardStore.push(mainSlot);
			mainSlot = null;
			for(let acard of additionalSlots){
				cardStore.push(acard);	
			}
			additionalSlots = [];
			mainSlot = card;	
		}
	}else{
		mainSlot = card;	
	}
	
	cardStoreRemoveCard(card.id);
	cardStoreSorterFunction(cardStore);
	onCardChange();
	drawAllCards();
}
