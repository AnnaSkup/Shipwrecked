var shownRecipeChange = function(recipe){
	const upper = document.getElementsByClassName("upper")[0];
	const title = upper.getElementsByClassName("recipeTitle")[0];
	const mainCard = upper.getElementsByClassName("mainCardSpace")[0];
	const collectCards = upper.getElementsByClassName("collectCards")[0];
	const additionalSpaces = upper.getElementsByClassName("additionalSpaces")[0];
	const oldStartButton = upper.getElementsByClassName("startRecipeButton")[0];
	const startButton = oldStartButton.cloneNode(true);
	startButton.textContent = "Start";
	oldStartButton.replaceWith(startButton);
	const recipeDesc = upper.getElementsByClassName("recipeDesc")[0];
	
	mainCard.className = "mainCardSpace";
	collectCards.className = "collectCards hidden";
	additionalSpaces.className = "additionalSpaces";
	
	while (additionalSpaces.firstChild) {
		additionalSpaces.removeChild(additionalSpaces.lastChild);
	}
	
	while(recipeDesc.firstChild){
			recipeDesc.removeChild(recipeDesc.lastChild);
			recipeDesc.textContent = "";
		}
	
	if(recipe == null){
		title.textContent = lang["emptyTitle"];
		while (mainCard.firstChild) {
			mainCard.removeChild(mainCard.lastChild);
		}
		startButton.className = "startRecipeButton";
	}else{
		title.textContent = recipe.title;
		
		var el = document.createElement( 'html' );
		el.innerHTML = "<html><div class='inner'>"+recipe.desc+"</div></html>";
		recipeDesc.appendChild(el.querySelector(".inner"));
		
		const existingImgs = mainCard.getElementsByTagName("img");
		if(existingImgs.length > 0){
			existingImgs[0].setAttribute("src","images\\"+mainSlot.img);
		}else{
			const img = document.createElement("img");
			img.setAttribute("src","images\\"+mainSlot.img);
			mainCard.appendChild(img);	
		}
		if(recipe.additionalSpaces > 0){
			for(let i=0;i<recipe.additionalSpaces;i++){
				const addSpace = document.createElement("div");
				if(additionalSlots.length > i){
					const img = document.createElement("img");
					img.setAttribute("src","images\\"+additionalSlots[i].img);
					img.setAttribute("ondblclick","dbClickAdditionalSlot("+additionalSlots[i].id+")");
					addSpace.appendChild(img);
				}
				additionalSpaces.appendChild(addSpace);
			}
		}
		
		if(recipe.isHint)
		{
			startButton.className = "startRecipeButton";
		}else{
			startButton.className = "startRecipeButton active";
			
			startButton.addEventListener("click",()=>{
				createAction(recipe);
			})
		}
	}
}

var showAction = function(action){
	const upper = document.getElementsByClassName("upper")[0];
	const title = upper.getElementsByClassName("recipeTitle")[0];
	const mainCard = upper.getElementsByClassName("mainCardSpace")[0];
	const collectCards = upper.getElementsByClassName("collectCards")[0];
	const additionalSpaces = upper.getElementsByClassName("additionalSpaces")[0];
	const oldStartButton = upper.getElementsByClassName("startRecipeButton")[0];
	const startButton = oldStartButton.cloneNode(true);
	startButton.textContent = "Collect";
	oldStartButton.replaceWith(startButton);
	const recipeDesc = upper.getElementsByClassName("recipeDesc")[0];
	
	mainCard.className = "mainCardSpace hidden";
	collectCards.className = "collectCards";
	additionalSpaces.className = "additionalSpaces hidden";
	
	while(recipeDesc.firstChild){
			recipeDesc.removeChild(recipeDesc.lastChild);
			recipeDesc.textContent = "";
		}
	
	if(action == null){
		title.textContent = lang["emptyTitle"];
		while (mainCard.firstChild) {
			mainCard.removeChild(mainCard.lastChild);
		}
		startButton.className = "startRecipeButton";
	}else{
		title.textContent = action.actionData.title;
		
		var el = document.createElement( 'html' );
		el.innerHTML = "<html><div class='inner'>"+action.actionData.description+"</div></html>";
		recipeDesc.appendChild(el.querySelector(".inner"));
		
		while (collectCards.firstChild) {
			collectCards.removeChild(collectCards.lastChild);
		}
		for(let card of action.cardList){
			const img = document.createElement("img");
			img.setAttribute("src","images\\"+card.img);
			img.addEventListener("click",()=>{
				createPopupCard(card);
			})
			collectCards.appendChild(img);	
		}
		
		if(!action.actionData.isEnd){
			startButton.className = "startRecipeButton";
		}else{
			startButton.className = "startRecipeButton active";
			
			startButton.addEventListener("click",()=>{
				onCloseAction(action);
				shownRecipeChange(null);
			});	
		}
	}
}