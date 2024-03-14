actionsList = [];

class Action{
	cardList = [];
	actionId = "nothing";
	constructor(cardList,actionId){
		this.cardList = cardList;
		this.actionId = actionId;
		this.timePassed = 0;
		this.creationTime = Date.now();
		this.actionData = actionData[actionId];
		this.actionHistory = [actionId];
		this.elementId = Math.random();
	}
	changeState(){
		const newId = this.actionData.nextStateFunction(this.cardList);
		this.actionId = newId;
		this.timePassed = 0;
		this.creationTime = Date.now();
		this.actionData = actionData[newId];
		if(this.actionData == undefined){
			this.actionData = endData[newId];	
		}
		this.actionHistory.push(newId);
	}
	getCompletionPercentage(){
		if(this.actionData && this.actionData.time){
			return this.timePassed/this.actionData.time;
		}
		return 0;
	}
	getTimeOfExistance(){
		return Date.now() - this.creationTime;
	}
	getTimeRemaining(){
		if(this.actionData){
			return this.actionData.time - this.getTimeOfExistance();
		}
		return 0;
	}
}

const hungerFunction = (cardList)=>{
			cardList.splice(0,cardList.length);
			
			let food = grabCardFromStore((card) => longestFoodIds.has(card.type));
			let time = "longest";
			if(food == null){
				time = "long";
				food = grabCardFromStore((card) => longFoodIds.has(card.type));
				if(food == null){
					food = grabCardFromStore((card) => foodIds.has(card.type));	
					time = "normal";
				}
			}
			if(food == null){
				const newAction = new Action([],"gainIllness");	
				actionsList.push(newAction);
				addActionToUI(newAction);				
			}else{
				cardList.push(food);
			}
			switch(time){
				case "longest": return "hungerLongest";
				case "long": return "hungerLong";
			}
			return "hunger";
		};
		
const endFunction = function(cardList){return "";};
const actionData = {
	"testTransform":{
		time:2000,
		title:"Testing transformations",
		description:"I am gaining a card in this test.",
		nextStateFunction:(cardList)=>{
			cardList.push(new Card("test2"));
			return "testTransformEnd";
			}
	},
	"testTransform3":{
		time:5000,
		title:"Testing transformations with additional fields",
		description:"I am gaining a card in this test.",
		nextStateFunction:(cardList)=>{
			const l = cardList.length;
			for(let i=0;i< l;i++){
				cardList.push(new Card("test3"));	
				}
			return "testTransform3End";
			}
	},
	"testTransform4":{
		time:1500,
		title:"Testing transformations with additional fields, by overpowering",
		description:"I am gaining a card in this test.",
		nextStateFunction:(cardList)=>{
			const l = cardList.length;
			for(let i=0;i< l;i++){
				cardList.push(new Card("test2"));	
				}
			return "testTransform4End";
			}
	},
	"startRecipe1":{
		time:60000,
		title:"Uneventful voyage [Click here to see the description]",
		description:"The sea is calm. Every day, I am getting closer to my destination.",
		nextStateFunction:(cardList)=>{
			return "startRecipe2";
		}
	},
	"startRecipe2":{
		time:30000,
		title:"Sleepless voyage",
		description:"I can't sleep, the nightmares wake me up. Something is in the water, but the mariners ensure me it's empty.",
		nextStateFunction:(cardList)=>{
			cardList.push(new Card("somethinginwater"));
			return "startRecipe3";
		}
	},
	"startRecipe3":{
		time:10000,
		title:"Eventful voyage",
		description:"The ship creaks and groans. Steel hull wrinkles with tension. When alarm is raised, and everybody panicks, I can almost see a dark shape rising from beneath the waves. Then everything fades to black.",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("beachStart"));
			cardList.push(new Card("fish"));
			const newAction = new Action([],"hunger");
			actionsList.push(newAction);
			addActionToUI(newAction);
			return "startRecipeEnd";
		}
	},
	"hunger":{
		time:60000,
		title:"Hunger",
		color:"#ff99dd",
		description:"I have to eat. If I don't, my health will suffer, and then I'll eventually die. <br/><br/>This action will take food items from your stash. If you don't have food at the end of the cycle, you will gain illness.",
		nextStateFunction:hungerFunction,
	},"hungerLong":{
		time:90000,
		title:"Hunger",
		color:"#ff99dd",
		description:"I have to eat. If I don't, my health will suffer, and then I'll eventually die. <br/><br/>This action will take food items from your stash. If you don't have food at the end of the cycle, you will gain illness.",
		nextStateFunction:hungerFunction,
	},"hungerLongest":{
		time:120000,
		title:"Hunger",
		color:"#ff99dd",
		description:"I have to eat. If I don't, my health will suffer, and then I'll eventually die. <br/><br/>This action will take food items from your stash. If you don't have food at the end of the cycle, you will gain illness.",
		nextStateFunction:hungerFunction,
	},"gainIllness":{
		time:5000,
		title:"Illness emerges",
		color:"#99ffaa",
		description:"My body is failing me. Or, perhaps I am failing my body.",
		nextStateFunction:(cardList)=>{
			cardList.push(new Card("illness"));
			return "gainIllnessEnd";
		}
	},"beachStart":{
		time:60000,
		title:"Foraging on the beach",
		description:"I am battered, bruised and tired, but I the hunger is stronger",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("beach"));
			for(let i=0;i<7;i++){
				cardList.push(new Card("preserved"));
			}
			cardList.push(new Card("forestStart"));
			return "beachStartEnd"
		}
	},"beachForage":{
		time:60000,
		title:"Foraging on the beach",
		description:"I might find something among the sand and waves.",
		nextStateFunction:(cardList)=>{
			let revardType = "";
			if(cardList.length > 1){
				switch(cardList[1].type){
					case "stick":
					case "stone":
						revardType = beachStick.getAType();
					break;
					case "stoneSharp":
						revardType = beachSharp.getAType();
					break;
					case "axe":
						revardType = beachAxe.getAType();
					break;
				}
			}if(revardType == "")
				revardType = beachEmpty.getAType();
			
			cardList.push(new Card(revardType));
			return "beachForageEnd";
		}
	},"forestStart":{
		time:60000,
		title:"Foraging in the forest",
		description:"I place markers and mark the trees. When I return here, I won't get lost.",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("forest"));
			cardList.push(new Card("berries"));
			cardList.push(new Card("mountainStart"));
			return "forestStartEnd";
		}
	},"forestForage":{
		time:60000,
		title:"Foraging in the forest",
		description:"I might find something among the trees and bushes.",
		nextStateFunction:(cardList)=>{
			let revardType = "";
			if(cardList.length > 1){
				switch(cardList[1].type){
					case "stick":
						revardType = forestStick.getAType(); break;
					case "stone":
						revardType = forestStone.getAType(); break;
					case "stoneSharp":
						revardType = forestSharp.getAType(); break;
					break;
				}
			}if(revardType == "")
				revardType = forestEmpty.getAType();
			
			cardList.push(new Card(revardType));
			return "forestForageEnd";
		}
	},"forestCutTreeAction":{
		time: 80000,
		title:"Cutting down a tree",
		description:"The tree wobbles sligthly when I strip it's wood, one axe swing at a time.",
		nextStateFunction:(cardList)=>{
			cardList.push(new Card("log"));
			return "forestForageEnd";
		}
	},"mountainStart":{
		time:60000,
		title:"Trek in the mountain",
		description:"Like previously, I place markers to find my way back. Around me long-nosed critters scutter about.",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("mountain"));
			cardList.push(new Card("altarStart"));
			return "mountainStartEnd";
		}
	},"mountainForage":{
		time:60000,
		title:"Trek in the mountain",
		description:"I wander about the mountain, gathering whatever seems useful.",
		nextStateFunction:(cardList)=>{
			//remove food
			const foodIdx = cardList.findIndex(x => allFoodIds.has(x.type));
			if(foodIdx >= 0)			
				cardList.splice(foodIdx,1);
			let revardType = "";
			if(cardList.length > 1){
				switch(cardList[1].type){
					case "stick":
						revardType = mountainStick.getAType(); break;
					case "stone":
						revardType = mountainStone.getAType(); break;
					case "stoneSharp":
						revardType = mountainSharp.getAType(); break;
					case "axe":
						revardType = mountainAxe.getAType(); break;
					break;
				}
			}if(revardType == "")
				revardType = mountainEmpty.getAType();	
			cardList.push(new Card(revardType));
			return "mountainTreckEnd";
		}
	},"craftCampfire":{
		time:60000,
		title:"Crafting a campfire",
		description:"My hands are hurt, but I will persevere.",
		nextStateFunction:(cardList)=>{
			const newId = craftCampfire.getAType();
			if(newId != 'nothing'){
				cardList.splice(0,cardList.length);
				cardList.push(new Card("campfire"));				
				return "campfireSuccess";
			}
			
			return "campfireFailure";
		}
	},"craftSignalFire":{
		time:60000,
		title:"Crafting a signal fire",
		description:"I chop wood, and toss it into the ever growing fire",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("signal"));				
			return "signalFireCraft";
		}
	},"craftSharp":{
		time:60000,
		title:"Crafting a sharp stone",
		description:"I carefully chip away at the rock, until a sharp edge is revealed.",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("stoneSharp"));				
			return "sharpCraft";
		}
	},"campfireRefresh":{
		time:10000,
		title:"Refueling the campfire",
		description:"I toss the twigs, and they fire consumes them",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("campfire"));				
			return "campfireRefreshEnd";
		}
	},"craftBlood":{
		time: 30000,
		title:"Bleeding myself",
		description:"If I am precise and swift, this will almost not hurt at all",
		nextStateFunction:(cardList)=>{
			cardList.push(new Card("blood"));
			const illnessCard = drawingBlood.getAType();
			if(illnessCard != "nothing"){
				cardList.push(new Card(illnessCard));	
			}
			return "craftBloodEnd";
		}		
	}, "craftAxe":{
		time: 60000,
		title:"Crafting an improvised axe",
		description:"Crafting tools is not easy, but I've gotten the hang of it by now.",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("axe"));				
			return "craftAxeEnd";
		}
	}, "craftSticks":{
		time: 60000,
		title:"Chopping down the log",
		description:"My arms tire, as I rythmically partition the log.",
		nextStateFunction:(cardList)=>{
			const idx = cardList.findIndex(x => x.type == "log");
			cardList.splice(idx,1);
			for(let i=0;i<5;i++){
				cardList.push(new Card("stick"));					
			}
			return "craftSticksEnd";
		}
	}, "craftunRaft":{
		time: 60000,
		title:"Binding the logs",
		description:"I try various things. Knotted young twigs, wooden dowels, a piece of rope from the old ship...",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("unfinishedRaft"));	
			return "craftunRaftEnd";
		}
	}, "craftRaft":{
		time: 60000,
		title:"Working on the raft",
		description:"All I need to do is to repeat this labourious proces three times.",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("raft"));	
			return "craftRaftEnd";
		}
	},"observeSea":{
		time: 60000,
		title:"Observing the sea",
		description:"I strain my eyes, as I stare into the distance. Somebody, come. Please.",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("campfire"));	
			cardList.push(new Card(observeSea.getAType()));
			return "observeSeaEnd";
		}
	},"altarStart":{
		time:60000,
		title:"Searching the altar",
		description:"My ears tune in to the wind whispers, as I rummage through the occult stones. Minute by minute, they start making more sense.",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("altar"));	
			cardList.push(new Card("amulet"));
			cardList.push(new Card("madness"));
			return "altarStartEnd";
		}
	},"leaveIsland":{
		time:60000,
		title:"Coming home",
		description:"I row my little raft, as it is tossed by the waves. The mariners beckon to me. I am almost there.",
		color:"#ffcc00",
		nextStateFunction:(cardList)=>{
			location.href = 'dead.html?color=white&dead=false&comment=I return to the land, and share my experiences. People listen to me intently, but my tales of a sea monster and the occult are treated as an exaggeration. The amulet is identified as a forgery. Maybe, if I was braver I\'d show them the truth, the island, the monster. But I am happy with my family and future on the land. I will not throw it away just to be right. [You have managed to leave the island, and lived a life of a mortal. Congratulations]';
			return "theEnd";
		}
	},"cookCrab":{
		time:30000,
		title:"Cooking the crab",
		description:"The slimy meat becomes tender. I am carefull not to burn it.",
		nextStateFunction:(cardList)=>{
			const foodIdx = cardList.findIndex(x => x.type == "crab");
			cardList.splice(foodIdx,1);
			cardList[0].timePassed += 30000;
			cardList.push(new Card("crabCooked"))
			return "cookEnd";
		}
	},"cookCritter":{
		time:60000,
		title:"Cooking the critter",
		description:"I roast it slowly over a fire. The juices drip into the flames, and sizzle.",
		nextStateFunction:(cardList)=>{
			const foodIdx = cardList.findIndex(x => x.type == "critter");
			cardList.splice(foodIdx,1);
			cardList[0].timePassed += 60000;
			cardList.push(new Card("critterCooked"))
			return "cookEnd";
		}
	},"healHealingHerb":{
		time:60000,
		title:"Applying blue flowered herb to my aliment",
		description:"At first, it hurts. Then there is numbness.",
		nextStateFunction:(cardList)=>{
			const herbIdx = cardList.findIndex(x => x.type != "illness");
			cardList.splice(herbIdx,1);
			
			const success = healIllnessWithHerb.getAType();
			if(success){
				cardList.splice(0,cardList.length);
				return "healHerbSuccess";
			}
			return "healHerbFail";
		}
	},"healPoisonHerb":{
		time:60000,
		title:"Applying broad leafed herb to my aliment",
		description:"I have a sudden clarity of mind, just after applying it. As if my mind was refreshed. Then, my innards contort.",
		nextStateFunction:(cardList)=>{
			const herbIdx = cardList.findIndex(x => x.type != "illness");
			cardList.splice(herbIdx,1);
			cardList.push(new Card("illness"));
			return "healPoisonHerbEnd";
		}
	},"healVisionHerb":{
		time:60000,
		title:"Applying foul smelling herb to my aliment",
		description:"My head swims as I apply it. The effect deepens with time, until I am completely dissolved.",
		nextStateFunction:(cardList)=>{
			const herbIdx = cardList.findIndex(x => x.type != "illness");
			cardList.splice(herbIdx,1);
			cardList.push(new Card("unity"));
			return "healVisionHerbEnd";
		}
	},"ingestHerbHeal":{
		time:60000,
		title:"Ingesting blue flowered herb",
		description:"It tastes bitter, and then my mouth goes numb.",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			return "ingestHerbHealEnd";
		}
	},"ingestHerbPoison":{
		time:60000,
		title:"Ingesting broad leafed herb",
		description:"It is tasteless, but shortly after mind is refreshed as if after the bath. Then the torsions begin.",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("illness"));
			return "ingestHerbPoisonEnd";
		}
	},"ingestHerbVision":{
		time:60000,
		title:"Ingesting foul smelling herb",
		description:"I almost gag because of the smell, but the taste is sweet and pleasant. I feel myself detached from my own problems. The detachment grows.",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("unity"));
			return "ingestHerbVisionEnd";
		}
	},"madnessHealingHerb":{
		time:60000,
		title:"Applying blue flowered herb to help my mind",
		description:"I feel numb. My mouth is full of bitterness.",
		nextStateFunction:(cardList)=>{
			const herbIdx = cardList.findIndex(x => x.type != "madness");
			cardList.splice(herbIdx,1);
			return "madnessHerbHealEnd";
		}
	},"madnessPoisonHerb":{
		time:60000,
		title:"Applying broad leafed herb to my mind",
		description:"I have a sudden clarity of mind, just after applying it. As if my mind was refreshed. Then, my innards contort.",
		nextStateFunction:(cardList)=>{
			cardList.splice(0,cardList.length);
			cardList.push(new Card("illness"));
			return "madnessPoisonHerbEnd";
		}
	},"madnessVisionHerb":{
		time:60000,
		title:"Applying foul smelling herb to my aliment",
		description:"I... I am not sure where, who, when, what...",
		nextStateFunction:(cardList)=>{
			const herbIdx = cardList.findIndex(x => x.type != "madness");
			cardList.splice(herbIdx,1);
			cardList.push(new Card("title1"));
			return "madnessVisionHerbEnd";
		}
	},"riteGuidance":{
		time:60000,
		title:"Performing a ritual",
		description:"I feel like I am going mad, splashing blood upon the stones. It is being soaked in.",
		nextStateFunction:(cardList)=>{
			const bloodIdx = cardList.findIndex(x => x.type == "blood");
			cardList.splice(bloodIdx,1);
			cardList.push(new Card("divineGuidance"));
			cardList.push(new Card("madness"));
			return "riteGuidanceEnd";
		}
	},"riteAscention":{
		time:60000,
		title:"Performing a ritual",
		description:"This is the end. I invoke the title, and present my gift, spiced with my blood. It will work. It must work.",
		color:"#ffcc00",
		nextStateFunction:(cardList)=>{
			location.href = 'dead.html?color=yellow&dead=false&comment=The altar rock opens, and I can pass. I join the ranks of Th\'shchin. Here I can see the powers, the lies and the deeper currents bowing down. I take the cup and drink, and my old body is stripped away like dirty rags. I don a new body, generously gifted to me by Th\'shchin. I am immortal now, and as long as I remain in service, I will remain one. [You have managed to leave the island, and live a life of an immortal. Congratulations]';
			return "testTransformEnd";
		}
	},"getTitle3":{
		time:60000,
		title:"Sea monster dream",
		description:"My eyes on the beast, I fall asleep. Despite my closed eyes, I can still see the beast, now more majestic than ever. It approaches me.",
		nextStateFunction:(cardList)=>{
			const unityIdx = cardList.findIndex(x => x.type == "unity");
			cardList.splice(unityIdx,1);
			cardList.push(new Card("madness"));
			cardList.push(new Card("title3"));
			return "title3End";
		}
	},"getTitle2":{
		time:60000,
		title:"Amulet dream",
		description:"I close my eyes, amulet weighing on my chest. It pushes me in a direction I did not realised exists before...",
		nextStateFunction:(cardList)=>{
			const unityIdx = cardList.findIndex(x => x.type == "unity");
			cardList.splice(unityIdx,1);
			cardList.push(new Card("madness"));
			cardList.push(new Card("title2"));
			return "title2End";
		}
	}, "riteFood":{
		time:60000,
		title:"Sacrificial rite",
		description:"I try to follow what I am supposed to. Strangely, it seems like a second nature to me.",
		nextStateFunction:(cardList)=>{
			let bloodIdx = cardList.findIndex(x => x.type != "altar");
			while(bloodIdx >= 0){
				cardList.splice(bloodIdx,1);	
				bloodIdx = cardList.findIndex(x => x.type != "altar");
			}
			
			cardList.push(new Card("madness"));
			for(let i=0; i<3;i++){
				cardList.push(new Card(seaMonsterGifts.getAType()));	
			}
			
			return "riteFoodEnd";
		}
	}
}

for(const [key, value] of Object.entries(actionData)){
	value.isEnd = false;
}

const endData = {
	"testTransformEnd":{
		title:"Transformation complete",
		description:"The transformation is complete",
	},
	"testTransform3End":{
		title:"Transformation complete 3",
		description:"The transformation 3 is complete",
	},
	"testTransform4End":{
		title:"Transformation complete 4",
		description:"The transformation 4 is complete",
	},
	"startRecipeEnd":{
		title:"Shipwrecked",
		description:"I wake up on a beach. My bruised body protests with pain. I am lucky to survive.",
	},
	"gainIllnessEnd":{
		title:"I am ill",
		description:"I don't feel good. One step closer to death."
	},
	"beachForageEnd":{
		title:"After the forage",
		description:"I return. The humming of waves still rings in my ears."
	},
	"beachStartEnd":{
		title:"After the forage",
		description:"I return. I gathered what I could, the rest will be claimed by the sea. While searching, I noticed a few crabs skurrying about."
	},
	"forestStartEnd":{
		title:"After the forage",
		description:"I return. I placed marks on the trees that will lead me back. In the distance I notice a mountain. Something stirs in my memory. This is the same mountain I saw in my nightmares."
	},
	"forestForageEnd":{
		title:"After the forage",
		description:"I return. The trees hum behind."
	},
	"mountainStartEnd":{
		title:"After the treck",
		description:"At the top of the mountain I can see a structure. An altar of some kind. It... whispers to me? I can not make the words, it must be the wind."
	},
	"mountainTreckEnd":{
		title:"After the treck",
		description:"I return. The wind hums behind."
	},"campfireSuccess":{
		title:"A spark, and a flame",
		description: "I toil, toil and toil, and finally it is rewarded. The sticks fuel a small, flickering flame."
	},"campfireFailure":{
		title:"Disappointment",
		description: "I toil, toil and toil, all for nothing. Eventually my hands get too tired to try anymore."
	},"signalFireCraft":{
		title:"Signal fire crafted",
		description: "The fire is very hot, and if I stand too close I'll get burned."
	}, "sharpCraft":{
		title:"Sharp stone crafted",
		description: "Stone shards litter my work area. In my hand - the result of my work."
	}, "campfireRefreshEnd":{
		title:"Fire burns anew",
		description: "The dimished flames dance once again."
	}, "craftBloodEnd":{
		title:"Blood drawn",
		description:"I bandage the cut with whatever I can find. Before me there lies a little bit of me."
	}, "craftAxeEnd":{
		title:"An axe crafted",
		description:"Finally, I can release this tools full potential."
	}, "craftSticksEnd":{
		title:"Chopped down",
		description:"After the log is no more, I am left with wood chips and firewood."
	}, "craftunRaftEnd":{
		title:"Unfinished raft",
		description:"I finally figured it out. I just need more logs to finish this."
	}, "craftRaftEnd":{
		title:"Finished raft",
		description:"The raft is finished. One less thing to get out of here."
	}, "observeSeaEnd":{
		title:"The signal burns out",
		description:"The signal fire is reduced to cinders."
	}, "altarStartEnd":{
		title:"Th'shchin",
		description:"\"Th'shchin\" whispers the wind \"Th'shchin\" whisper the stones. My head hurts, but as I decide to head back something catches my eye."
	}, "theEnd":{
		title:"Ending",
		description: "Ending"
	}, "cookEnd":{
		title: "Cooking finished",
		description: "I have something slightly more edible",
	},
	"healHerbSuccess":{
		title:"I am healthier",
		description:"Numbness subsidies, and my ailment with it."
	},"healHerbFail":{
		title:"I am not healthier",
		description:"Numbness subsidies, but my ailment remains. At least i had some respite from pain."
	},"healPoisonHerbEnd":{
		title:"Poisoned",
		description:"I writhe on the ground, screaming in pain. Eventually the torment ends, and I am left weak and exhausted.",
	}, "healVisionHerbEnd":{
		title:"Visions",
		description:"I have dissolved into the reality, becoming one, and travelled to places mortal couldn't ever visit. Now, as I lay disoriented on the sand, some of that oneness remains. Ailment remains too."
	}, "ingestHerbHealEnd":{
		title:"Feeling better",
		description:"Eventually, the numbness subsidies. I feel better, I think?"
	},"ingestHerbPoisonEnd":{
		title:"Feeling worse, and better",
		description:"Torsions finally end, and I can crawl out of my vomit to clean myself. I'd enjoy the clarity of mind, if it wasn't for the side effects."
	},"ingestHerbVisionEnd":{
		title:"One with the universe",
		description:"It's hard to describe what I just experienced. I was one with the reality, and travelled to realms which mortals can not visit, much less imagine. Now that I am back in my mortal shell much of what I saw eludes me. Still, something lingers with me."
	},"madnessHerbHealEnd":{
		title:"The herb failed to help me",
		description:"Unrealness of my own body still haunts me. The bitter taste was of no help."
	},'madnessPoisonHerbEnd':{
		title:"The herb helped my mind, at a cost",
		description:"I can stay focused, at last. If only this didn't hurt do much."
	},"madnessVisionHerbEnd":{
		title:"Dream of nowhere",
		description:"In my dreams, I ventured nowhere, to a a city that never exists, and talked to people perfect enough to be nobody. It... didn't help heal my mind. But I have learned something."
	},"riteGuidanceEnd":{
		title:"Rite has finished",
		description:"The voices got louder, then felt silent. I waited in the choking silence for an eternity. And then the booming voice only I could hear spoke."
	},"title3End":{
		title:"Dream of the sea beast",
		description: "When I wake, I can only remember fragments of a dream. But the most important thing remains - The Title."
	},"title2End":{
		title:"Dream of lies",
		description: "I wake, my head is filled with lies. One in particular is the most important - The Title."
	},"riteFoodEnd":{
		title:"Sea monster responds",
		description:"I was not granted an acknowledgement of the Great One. But something has heard my pleas. The Sea Monster has left its gifts for me."
	}
}

for(const [key, value] of Object.entries(endData)){
	value.isEnd = true;
}

const createAction = (recipe) => {
	const newActionId = recipe.funcAction(recipe);
	const cardList = [mainSlot, ...additionalSlots];	//TODO Add ability to add more cards
	const newAction = new Action(cardList,newActionId);
	actionsList.push(newAction);
	addActionToUI(newAction);
	mainSlot = null;
	additionalSlots = [];
	onCardChange();
}
const onCloseAction = function(action){
	const aIdx = actionsList.findIndex(x => x.elementId == action.elementId);
	if(aIdx >= 0){
		actionsList.splice(aIdx,1);
		for(let card of action.cardList){
			cardStore.push(card);
		}	
		redrawActions();
	}
}

var delay = 100;
var speedMultiplier = 1.0;
var intervalId = null;

const intervalFunction = (previousDelay)=>{	
	try{
		for(let action of actionsList){
			if(!action.actionData.isEnd){
				action.timePassed += previousDelay;	
				if(action.getCompletionPercentage() >= 1){
					action.changeState();
				}			
			}
		}	
		redrawActions();
		for(let card of cardStore){
			if(card.expiryTime > 0){
				card.timePassed += previousDelay;	
			}
		}
		
	}catch(error){
		console.error(error);
	}
	const del = delay * speedMultiplier;
	intervalId = setTimeout(intervalFunction,del,delay);
};

const togglePause = function(pause){
	if(pause == undefined){
		pause = intervalId != null;
	}
	if(pause){
		if(intervalId != null){
			clearTimeout(intervalId);
			intervalId = null;	
		}
	}else{
		intervalId = setTimeout(intervalFunction,delay,delay);
	}
}



