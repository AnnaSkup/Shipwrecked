class Card {
  constructor(type) {
	this.id = parseInt(Math.random() * 1000000000);
	this.amount = 1;
    this.type = type;
	this.img ="test.svg";
	this.title = "A card";
	this.desc = "Description of a card. If you can see this, this means something went wrong when the card was created.";
	this.amount = 1;
	this.timePassed = 0;
	this.expiryTime = 0;
	const initData = cardInitDataDict[type];
	if(initData != null){
		for(const [key, value] of Object.entries(initData)){
			this[key] = value;
		}
	}
  }
  getRemainingSeconds(){
	  if(this.expiryTime > 0){
		  return (this.expiryTime - this.timePassed)*0.001;
	  }
	  return 0;
  }
  
}

class Attribute {
	constructor(id) {
		this.id = id;
	}
	
}
const cardInitDataDict = {
	"test":{
		img:"heart.svg",
		title:"Test Card",
		desc:"This is a test card, the Adam of cards. It's purpose is to test things."
	},
	"test2":{
		img:"lightning.svg",
		title:"Test Card 2",
		desc:"This is a test card 2, the Eve of cards. It's purpose is to test things. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	"test3":{
		img:"shape.svg",
		title:"Test Card 3",
		desc:"This is a test card 3. It's purpose is to test the additional slots."
	},
	"babylon":{
		img:"babylon.svg",
		title:"Dream of a city",
		desc:"This is the city I saw in my dreams. Ten golden towers rising to the sky. Streets cobbled with amber. Ten kings ruling. I have to find it.",
		expiryTime: 20000
	},
	"fish":{
		img:"food_fish.svg",
		title:"Raw fish",
		desc:"This critter was swimming not that long ago. Now it's mine to eat.",
		expiryTime: 180000
	},
	"startShip":{
		img:"startship.svg",
		title:"My voyage",
		desc:"The ship is waiting for me. I have to travel across the sea. It's time to go. [Double click on this card, to put it in the slot]"
	},

	"somethinginwater":{
		img:"somethinginthewater.svg",
		title:"Something in the water",
		desc:"I feel it more than see it. It's down there, somewhere. Black, writhing, circling."
		
	},
	"beachStart":{
		//this is so that the player can get the forest after first forage
		img:"beach.svg",
		title:"The beach",
		desc:"This is the place where the sea spewed me out. Debree is littering the coastline. Maybe I can find something to eat."
	},
	"beach":{
		img:"beach.svg",
		title:"The beach",
		desc:"This is the place where the sea spewed me out. Maybe I can find something to eat."
	},
	"forestStart":{
		// this is so player can get to the mountain after first forage
		img:"forest.svg",
		title:"The forest",
		desc:"This island is covered in a thick forest. Perhaps I can find something useful in here."
	},
	"forest":{
		img:"forest.svg",
		title:"The forest",
		desc:"This island is covered in a thick forest. Perhaps I can find something useful in here."
	},
	"mountainStart":{
		img:"mountain.svg",
		title:"The mountain",
		desc:"The center of the island is dominated by a small mountain."
	},
	"mountain":{
		img:"mountain.svg",
		title:"The mountain",
		desc:"The mountain may be small compared to the giants on the continents, but here it dominates everything. Various stones dot the landscape - maybe I can find one I could use."
	},
	"altarStart":{
		img:"altar.svg",
		title:"Altar",
		desc:"There is an altar on the top of the mountain. The wind hums on the stones, and it almost sounds like a human voice."
	},
	"altar":{
		img:"altar.svg",
		title:"Altar",
		desc:"There is an altar on the top of the mountain. The wind hums on the stones, and it almost sounds like a human voice."
	},
	
	"illness":{
		img:"illness.svg",
		title:"Illness",
		desc:"I am unwell. Thankfully this will heal with time. [Seven of these will kill you]",
		expiryTime: 600000
	},
	"madness":{
		img:"madness.svg",
		title:"Madness",
		desc:"What is real, and what is not? Do I even exist? Is reality just a dream? Do I dare to wake up? [Three of these will kill you]",
		expiryTime: 600000
	},
	"nothing":{
		img:"nothing.svg",
		title:"Nothing",
		desc:"I failed to gather anything at all.",
		expiryTime: 100000
	},
	
	//Material
	"stick":{
		img:"mat_stick.svg",
		title:"Stick",
		desc:"The first tool humanity has known. This very ordinary stick brims with potential."
	},
	"stone":{
		img:"mat_stone.svg",
		title:"Stone",
		desc:"Hard, heavy and dull. If I found another one, I could sharpen it."
	},
	"log":{
		img:"mat_log.svg",
		title:"Log",
		desc:"A tree that I laboriously cut down. It still bleeds sap."
	},
	"stoneSharp":{
		img:"mat_sharp.svg",
		title:"Sharp stone",
		desc:"Hard, heavy and sharp. I could use this to cut things, or to craft a more sophisticated tool."
	},
	"axe":{
		img:"mat_axe.svg",
		title:"Improvised axe",
		desc:"This is probably the best tool I can craft by myself here. It should be able to cut trees."
	},
	"campfire":{
		img: "mat_campfire.svg",
		title: "Campfire",
		desc: "The fire flickers and dances on the sticks. They will eventually burn out, but for now I have light and warmth.",
		expiryTime: 120000
	},
	"signal":{
		img: "mat_signal.svg",
		title: "Signal fire",
		desc: "The heat is almost unbearable, when I finish. For a short time, I am seen from the shore.",
		expiryTime: 120000,
		expiresTo:"campfire"
	},"unfinishedRaft":{
		img:"unfinishedRaft.svg",
		title:"Unfinished raft",
		desc:"I know how to bind them. I just need more logs to finish it.",
	}, "raft":{
		img:"raft.svg",
		title:"Raft",
		desc:"It will float for long enough to let me get to a ship.",
	},
	
	//Food
	"preserved":{
		img:"food_ship.svg",
		title:"Preserved food",
		desc:"Reclaimed supplies, most likely from my ship. They will last me for a while, but not forever.",
	},
	"crab":{
		img:"food_crab.svg",
		title:"Crab",
		desc:"This critter may not be the tastiest, but it will sustain me for a little while. It will go bad, eventually.",
		expiryTime: 180000
	},
	"berries":{
		img:"food_berries.svg",
		title:"Berries",
		desc:"Berries I have gathered in the forest. They are most likely not poisonous.",
		expiryTime: 180000
	},
	"critter":{
		img:"food_critter.svg",
		title:"Furry critter",
		desc:"These tree dwelling, long nosed critters wander sometimes into the mountain. They are almost helpless on the flat stones. Were they banished from the forest by their brethren? [This will fill you for longer]",
		expiryTime: 180000
	},
	"crabCooked":{
		img:"food_crab_cooked.svg",
		title:"Cooked Crab",
		desc:"The smell of cooked crab meat is suprisingly sweet. And it's much tastier than raw meat.",
		expiryTime: 320000
	},"critterCooked":{
		img:"food_critter_cooked.svg",
		title:"Cooked Critter",
		desc:"This cooked meal gives me some semblance of normalcy. It's been a long time since I've been sated.",
		expiryTime: 320000
	},
	
	
	//Herbs
	"herb_heal":{
		img:"herb_heal.svg",
		title:"Blue flowered herb",
		desc:"It smells like bitter garlick, its sap is thick and dark.",
		expiryTime: 120000
	},
	"herb_poison":{
		img:"herb_poison.svg",
		title:"Broad leafed herb",
		desc:"It's leaves are wide. They would resemble a cabbage, if they weren't so long.",
		expiryTime: 120000
	},
	"herb_vision":{
		img:"herb_vision.svg",
		title:"Foul smelling herb",
		desc:"The pod at the end is a flower smelling of rotten meat. Attracted flies buzz around.",
		expiryTime: 120000
	},"unity":{
		img:"unity.svg",
		title:"One with everything",
		desc:"The feeling still lingers. Was one with everything. Perhaps, I could ask it a question.",
		expiryTime: 60000
	},
	
	//sea
	"distanceShip":{
		img:"distance_ship.svg",
		title:"A ship in the distance",
		desc:"Seems like I caught an eye of a distant ship! It won't stay here forever, so I should strike the iron while it is hot.",
		expiryTime: 60000
	},"distanceNothing":{
		img:"distance_nothing.svg",
		title:"Nothing in the distance",
		desc:"Sea is quiet. I can't see any ships or monsters.",
		expiryTime: 60000
	},"distanceMonster":{
		img:"distance_monster.svg",
		title:"Sea monster in the distance",
		desc:"The beast is patrolling the coast today.",
		expiryTime: 60000
	},
	
	//occult
	"blood":{
		img:"blood.svg",
		title:"My blood",
		desc:"A little bit of my blood. It's bright and red now, but soon it will darken and stink my place.",
		expiryTime: 60000
	},
	"amulet":{
		img:"bloodyAmulet.svg",
		title:"An occult amulet",
		desc:"A metal amulet, covered in puzzling carvings. I saw it in my nightmares, somebody or something was using it to command the sea monster. Could it protect me from it as well?"
	},"divineGuidance":{
		img:"divineGuidance.svg",
		title:"Divine guidance",
		desc:"This is the word: You are invited to the court. To be elevated, you have to form a suitable response. You need to refer to your ruler with a one of his titles. You must provide to the feast. You must give of your blood.",
		expiryTime: 60000
	},"title1":{
		img:"title1.svg",
		title:"Th'shchin the perfect, Lord of Nowhere",
		desc:"In nowhere, where nonexisting things are, there is all that is perfect. There, a city of marble and gold, unchanged and always shifting. It's streets are cobbled with gems, skulls and spices. Nobody inhabits the city, and they all praise their Lord \"Th'shchin the perfect, Lord of Nowhere\"."
	},"title2":{
		img:"title2.svg",
		title:"Th'shchin the liar, Captor of Truth",
		desc:"With amulet, I am considered an envoy of a higher will. I pass through wall in reality, in direction not existing in any human language. I am visited by the previous envoy of Th'shchin, whose bones have been parted from his skin. He has but one purpose, and as long as he fullfills it, he is permitted existence. \"Fool\" he whispers to me \"what a fool I was, to stand on the side of Truth. Th'shchin has captured it, defeated it. He is now Th'shchin the liar, Captor of Truth, and truth has no power over him. Oh, what a fool I was.\""
	},"title3":{
		img:"title3.svg",
		title:"Th'shchin the dark, King of deeper waters",
		desc:"Humans may only pass the inner firmament, but in my dreams I communed with the Sea Beast, who vouched for me. We travelled the deep beneath the deep, where I could almost touch the stars of the outer firmament, and the Sea Beast spoke to me. \"My power comes from King of deeper waters, one that all fish have to worship. Let me show you how\". I can't bring this knowledge back behind the firmament, but now I know of the Th'shchin the dark, King of deeper waters. "
	}
}

const createCardStore = function(){
	//const cardlist = [new Card("stone"),new Card("stick"),new Card("stoneSharp"), new Card("axe"), new Card("beach"),new Card("forest"),new Card("mountainStart"),new Card("altarStart"),new Card("startShip"),new Card("amulet"),new Card("raft"),new Card("distanceShip")];
	
	//for (let i=0;i<10;i++){
		//let newCard = new Card("preserved");
		//cardlist.push(newCard);
	//}

	return [new Card("startShip")];
}

var cardStoreSorterFunction = (cardStore) => {return cardStore;};

var cardStore = createCardStore();

const cardStoreRemoveCard = (cardId)=>{
	const cardIdx = cardStore.findIndex(x => x.id == cardId);
	if(cardIdx > -1){
		cardStore.splice(cardIdx,1);
		return true;
	}
	return false;
}

const countCards = function(cardType) {
	let sicknessIds = new Set();
	const cardStoreIllness = cardStore.filter(x => x.type == cardType);
	for(let illnessCard of cardStoreIllness){
		sicknessIds.add(illnessCard.id);
	}
	if(mainSlot != null && mainSlot.type == cardType)
		sicknessIds.add(mainSlot.id);
	if(additionalSlots.length > 0){
		for(let addCard of additionalSlots){
			if(addCard.type == cardType)
				sicknessIds.add(addCard.id);		
		}
	}
	for(let action of actionsList){
		for(let actionCard of action.cardList){
			if(actionCard.type == cardType)
				sicknessIds.add(actionCard.id);
		}
	}
	return sicknessIds.size;
}
const checkLoseCondition = function(){
	const sicknessCards = countCards("illness");
	
	if(sicknessCards >= 7){
		//This is lose condition
		location.href = 'dead.html?color=red&dead=true&comment=My body, battered by illness, hunger and wounds could not go on for any longer. One day I close my eyes, and never open them again. [You have acquired 7 sickness cards, and died of illness.]';
	}
	const madnessCards = countCards("madness");
	
	if(madnessCards >= 3){
		//This is lose condition
		location.href = 'dead.html?color=red&dead=true&comment=This reality is not real. It\'s just a test. A ruse. A counterfeit. A joke. A tragedy. The body is chains that bind me. Now, I finally wake up. [You have acquired 3 madness cards, and went insane.]';
	}
}

const removeExpiredCards = ()=>{
	const expired = new Set();
	const add = [];
	for(let card of cardStore){
		if(card.expiryTime < card.timePassed){
			if(card.expiresTo){
				add.push(card.expiresTo);
			}
			expired.add(card.id);	
		}
	}
	cardStore = cardStore.filter(x => !expired.has(x.id));
	for(let newId of add){
		cardStore.push(new Card(newId));
	}
}

const cardDrawInterval = ()=>{
	try{
		removeExpiredCards();
		redrawTimedCards();
		drawAllCards();	
		checkLoseCondition();	
	}catch(err){
		console.error(err);
	}
	setTimeout(cardDrawInterval,100,100);
};
cardDrawInterval();

const grabCardFromStore = function(func){
	const cardIdx = cardStore.findIndex(func);
	if(cardIdx >= 0){
		const card = cardStore.splice(cardIdx,1)[0];
		return card;
	}
	return null;
}