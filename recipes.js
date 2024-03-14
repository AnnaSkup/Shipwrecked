mainSlot = null;
additionalSlots = [];

class Recipe{
	constructor(id,title,desc,funcShow,funcAction,isHint,additionalSpaces = 0){
		this.id = id;
		this.title = title;
		this.desc = desc;
		this.funcShow = funcShow;
		this.funcAction = funcAction;
		this.isHint = isHint;
		this.additionalSpaces = additionalSpaces;
	}
	hintFuncAction (){
		return this.id;
	}
}

const testFuncShow1 = function(){
	if(mainSlot != null){
		return mainSlot.type == "test";
	}
	return false;
}

const testFuncShow2 = function(){
	if(mainSlot != null){
		return mainSlot.type == "test2";
	}
	return false;
}

const testFuncShow3 = function(){
	if(mainSlot != null){
		return mainSlot.type == "test3";
	}
	return false;
}

const testFuncShow4 = function(){
	if(mainSlot != null && additionalSlots.length > 0){
		return mainSlot.type == "test3" && additionalSlots[0].type == "test2";
	}
	return false;
}

const startRecipeFunc = function(){
	if(mainSlot != null){
		return mainSlot.type == "startShip";
	}
	return false;
}

const beachStartFunc = function(recipe){
	if(mainSlot != null){
		return mainSlot.type == "beachStart";
	}
	return false;
}

const beachEmptyFunc = function(recipe){
	if(mainSlot != null){
		return mainSlot.type == "beach";
	}
	return false;
}

const beachStickFunc = function(recipe){
	if(mainSlot != null && mainSlot.type == "beach"){
		return additionalSlots.length > 0 && (additionalSlots[0].type == "stick" || additionalSlots[0].type == "stone");
	}
	return false;
}

const beachSharpFunc = function(recipe){
	if(mainSlot != null && mainSlot.type == "beach"){
		return additionalSlots.length > 0 && (additionalSlots[0].type == "stoneSharp");
	}
	return false;
}

const beachAxeFunc = function(recipe){
	if(mainSlot != null && mainSlot.type == "beach"){
		return additionalSlots.length > 0 && (additionalSlots[0].type == "axe");
	}
	return false;
}

const forestStartFunc = function(recipe){
	if(mainSlot != null){
		return mainSlot.type == "forestStart";
	}
	return false;
}

const forestEmptyFunc = function(recipe){
	if(mainSlot != null){
		return mainSlot.type == "forest";
	}
	return false;
}

const forestStickFunc = function(recipe){
	if(mainSlot != null && mainSlot.type == "forest"){
		return additionalSlots.length > 0 && (additionalSlots[0].type == "stick");
	}
	return false;
}
const forestStoneFunc = function(recipe){
	if(mainSlot != null && mainSlot.type == "forest"){
		return additionalSlots.length > 0 && (additionalSlots[0].type == "stone");
	}
	return false;
}
const forestSharpFunc = function(recipe){
	if(mainSlot != null && mainSlot.type == "forest"){
		return additionalSlots.length > 0 && (additionalSlots[0].type == "stoneSharp");
	}
	return false;
}
const forestAxeFunc = function(recipe){
	if(mainSlot != null && mainSlot.type == "forest"){
		return additionalSlots.length > 0 && (additionalSlots[0].type == "axe");
	}
	return false;
}

const mountainHintFunc = function(recipe){
	if(mainSlot != null){
		return mainSlot.type == "mountain" || mainSlot.type == "mountainStart";
	}
	return false;
}

const mountainStartFunc = function(recipe){
	if(mainSlot != null && mainSlot.type == "mountainStart"){
		return additionalSlots.length > 0 && (allFoodIds.has(additionalSlots[0].type));
	}
	return false;
}
const mountainEmptyFunc = function(recipe){
	if(mainSlot != null && mainSlot.type == "mountain"){
		return additionalSlots.length > 0 && (allFoodIds.has(additionalSlots[0].type));
	}
	return false;
}
const mountainToolFunc = function(toolid){
	return function(recipe){
		if(mainSlot != null && mainSlot.type == "mountain" && additionalSlots.length > 1){
			let foodPresent = false;
			let toolPresent = false;
			for(let card of additionalSlots){
				if (allFoodIds.has(card.type)){
					foodPresent = true;
				}
				if(card.type == toolid)
					toolPresent = true;
			}
			return foodPresent && toolPresent;
		}
		return false;
	}
}

const craftStickHintFunc = function(){
	if(mainSlot != null){
		return mainSlot.type == "stick";
	}
	return false;
}
const craftCampfireFunc = function(){
	if(mainSlot != null && mainSlot.type == "stick"){
		return additionalSlots.length > 0 && (additionalSlots[0].type == "stick");
	}
	return false;
}

const singleElemFunc = function(cardType){
	return function(){
		return mainSlot != null && mainSlot.type == cardType;
	}
}

const twoElemFunc = function (mainType, secondType){
	return function(){
		if(mainSlot != null && mainSlot.type == mainType){
			return additionalSlots.length > 0 && (additionalSlots[0].type == secondType);
		}
		return false;
	}
}

const twoElemAnyOrderFunc = function (typeA, typeB){
	return function(){
		if(mainSlot == null || additionalSlots.length < 1) return false;
		let a = mainSlot.type == typeA || additionalSlots[0].type == typeA;
		let b = mainSlot.type == typeB || additionalSlots[0].type == typeB;
		return a && b;
	}
}
const threeElemAnyOrderFunc = function (typeA, typeB, typeC){
	return function(){
		if(mainSlot == null || additionalSlots.length < 2) return false;
		let a = mainSlot.type == typeA || additionalSlots[0].type == typeA || additionalSlots[1].type == typeA;
		let b = mainSlot.type == typeB || additionalSlots[0].type == typeB || additionalSlots[1].type == typeB;
		let c = mainSlot.type == typeC || additionalSlots[0].type == typeC || additionalSlots[1].type == typeC;
		return a && b && c;
	}
}

const fourElemAnyOrderFunc = function (typeA, typeB, typeC, typeD){
	return function(){
		if(mainSlot == null || additionalSlots.length < 3) return false;
		let a = mainSlot.type == typeA || additionalSlots[0].type == typeA || additionalSlots[1].type == typeA || additionalSlots[2].type == typeA;
		let b = mainSlot.type == typeB || additionalSlots[0].type == typeB || additionalSlots[1].type == typeB || additionalSlots[2].type == typeB;
		let c = mainSlot.type == typeC || additionalSlots[0].type == typeC || additionalSlots[1].type == typeC || additionalSlots[2].type == typeC;
		let d = mainSlot.type == typeD || additionalSlots[0].type == typeD || additionalSlots[1].type == typeD || additionalSlots[2].type == typeD;
		return a && b && c && d;
	}
}

const ascentionFunc = function(){
	if(mainSlot == null || additionalSlots.length < 3) return false;
	let typeA = "altar";
	let typeB = "blood";
	let typeC = "critterCooked";
	let a = mainSlot.type == typeA || additionalSlots[0].type == typeA || additionalSlots[1].type == typeA || additionalSlots[2].type == typeA;
	let b = mainSlot.type == typeB || additionalSlots[0].type == typeB || additionalSlots[1].type == typeB || additionalSlots[2].type == typeB;
	let c = mainSlot.type == typeC || additionalSlots[0].type == typeC || additionalSlots[1].type == typeC || additionalSlots[2].type == typeC;
	let titles = new Set(["title1","title2","title3"]);
	let d = titles.has(mainSlot.type) || titles.has(additionalSlots[0].type) || titles.has(additionalSlots[1].type) || titles.has(additionalSlots[2].type);
	return a && b && c && d;
}

const riteFoodFunc = function(){
	if(mainSlot == null || additionalSlots.length < 2) return false;
	let typeA = "altar";
	let typeB = "blood";
	let a = mainSlot.type == typeA || additionalSlots.findIndex(x => x.type == typeA) >= 0;
	let b = mainSlot.type == typeB || additionalSlots.findIndex(x => x.type == typeB) >= 0;
	let c = longFoodIds.has(mainSlot.type) || foodIds.has(mainSlot.type) || additionalSlots.findIndex(x => longFoodIds.has(x.type) || foodIds.has(x.type)) >= 0;
	return a && b && c;
}

const raftRecipe = function(){
	if(mainSlot != null && mainSlot.type == "unfinishedRaft" && additionalSlots.length >= 3){
		let logCount = 0;
		for(let card of additionalSlots){
			if(card.type == "log") logCount+=1;
		}
		return logCount >= 3;
	}
	return false;
}

const testFuncAction = function(recipe){
	return "testTransform";
}

const testFuncAction3 = function(recipe){
	return "testTransform3";
}

const testFuncAction4 = function(recipe){
	return "testTransform4";
}

const startRecipeAction = function(recipe){
	return "startRecipe1";
}

const beachForageAction = function(recipe){
	return "beachForage";
}
const beachStartAction = function(recipe){
	return "beachStart";
}
const forestStartAction = function(recipe){
	return "forestStart";
}
const forestForageAction = function(recipe){
	return "forestForage";
}
const forestCutTreeAction = function(recipe){
	return "forestCutTreeAction";
}
const mountainStartAction = function(recipe){
	return "mountainStart";
}
const mountainForageAction = function(recipe){
	return "mountainForage";
}

const allRecipes = {
	"test2": new Recipe("test2","Test Recipe 2","This is a description of a test recipe 2. This is not a hint",testFuncShow2,testFuncAction,false),
	"test4": new Recipe("test4","Test Recipe 4","With this recipe I want to test overpowering recipes.",testFuncShow4,testFuncAction4,false,4),
	"test3": new Recipe("test3","Test Recipe 3","With this recipe I want to test additional Slots.",testFuncShow3,testFuncAction3,false,3),
	"startRecipe": new Recipe("startRecipe","Board the ship","I walk on the deck, dragging my belonging behind me. I encamp in cabin that will be my home for a few days. The journey begins. <br> [Click start to start the action]",startRecipeFunc,startRecipeAction,false,0),
	//beach
	"beachStart": new Recipe("beachStart","Search the beach","Debree and bodies are littering the sand. Perhaps I can find something usefult there.",beachStartFunc,beachStartAction,false,0),
	"beachStick": new Recipe("beachStick","Forage on beach with a simple tool","This will help me dig up the crabs.",beachStickFunc,beachForageAction,false,1),
	"beachSharp": new Recipe("beachSharp","Forage on beach with a sharp stone","This stone is great for opening crab armor.",beachSharpFunc,beachForageAction,false,1),
	"beachAxe": new Recipe("beachAxe","Forage on beach with an axe","Crabs will not escape my hunger.",beachAxeFunc,beachForageAction,false,1),
	"beachEmpty": new Recipe("beachEmpty","Forage on beach","I can forage on the beach, in search of food. I could bring a tool with me, if I have one.",beachEmptyFunc,beachForageAction,false,1),
	//forest
	"forestStart": new Recipe("forestStart","Explore the forest","The forest is thick and dark. Among the ordinary trees grow unfamiliar plants.",forestStartFunc,forestStartAction,false,0),
	"forestStick": new Recipe("forestStick","Explore the forest with a stick","Stick will make it easier to gather berries out of reach.",forestStickFunc,forestForageAction,false,1),
	"forestStone": new Recipe("forestStone","Explore the forest with a stone","Stone can be used to tear sticks out of trees.",forestStoneFunc,forestForageAction,false,1),
	"forestSharp": new Recipe("forestSharp","Explore the forest with a sharp stone","This will make cutting herbs easier.",forestSharpFunc,forestForageAction,false,1),
	"forestAxe": new Recipe("forestAxe","Explore the forest with an axe","Time to cut trees. This will take longer than usual.",forestAxeFunc,forestCutTreeAction,false,1),
	"forestEmpty": new Recipe("forestEmpty","Explore the forest","If I am lucky, I might find plants that will not poison me. I could bring a tool with me, if I have one.",forestEmptyFunc,forestForageAction,false,1),
	//mountain
	"mountainStart": new Recipe("mountainStart","Explore the mountain","The center of the island is dominated by a small mountain. I'll look into it.",mountainStartFunc,mountainStartAction,false,1),	
	"mountainStick": new Recipe("mountainStick","Explore the mountain, with a stick","A walking stick will be handy.",mountainToolFunc("stick"),mountainForageAction,false,2),
	"mountainStone": new Recipe("mountainStone","Explore the mountain, with a stone","Stone will make it easier to chip away at other stones.",mountainToolFunc("stone"),mountainForageAction,false,2),
	"mountainSharp": new Recipe("mountainSharp","Explore the mountain, with a sharp stone","Sharp edge will make gathering herbs easier.",mountainToolFunc("stoneSharp"),mountainForageAction,false,2),
	"mountainAxe": new Recipe("mountainAxe","Explore the mountain, with an axe","The critters that eluded me in the forest gather here from time to time. Without trees to escape to, they can be hunted down.",mountainToolFunc("axe"),mountainForageAction,false,2),
	"mountainEmpty": new Recipe("mountainEmpty","Explore the mountain","The center of the island is dominated by a small mountain. I'll gather what I can find.",mountainEmptyFunc,mountainForageAction,false,2),
	//crafting
	"craftCampfire": new Recipe("craftCampfire","Craft a campfire","If I rub the stick energetically enough, they may burst into flames. I think. [This recipe has a chance to fail]",craftCampfireFunc,()=>"craftCampfire",false,1),
	"craftSignalFire": new Recipe("craftSignalFire","Craft a signal fire","If I make the campfire bigger, it could be seen by the passing by ships.",twoElemFunc("campfire","log"),()=>"craftSignalFire",false,1),
	"craftSharp": new Recipe("craftSharp","Craft a sharp stone","I can use one stone to sharpen the other one.",twoElemFunc("stone","stone"),()=>"craftSharp",false,1),
	"craftAxe": new Recipe("craftAxe","Craft an improvised axe","I can add a handle to my sharp stone for a better grip.",twoElemAnyOrderFunc("stoneSharp","stick"),()=>"craftAxe",false,1),
	"craftBlood": new Recipe("craftBlood","Draw some of my blood","I can use the sharp stone to draw some of my blood. Or add something to craft with it.",singleElemFunc("stoneSharp"),()=>"craftBlood",false,1),
	"craftSticks": new Recipe("craftSticks","Chop log into smaller pieces","I can shop down this log into smaller pieces",twoElemAnyOrderFunc("axe","log"),()=>"craftSticks",false,1),
	"craftUnfinishedRaft": new Recipe("craftUnRaft","Start working on a raft","I can try to work out how to bind the logs together",twoElemFunc("log","log"),()=>"craftunRaft",false,1),
	"craftRaft": new Recipe("craftRaft","Finish the raft","I can begin work",raftRecipe,()=>"craftRaft",false,3),
	"observeSea": new Recipe("observeSea","Observe the sea","As the signal is burning, I'll wait ready for an opportunity.",singleElemFunc("signal"),()=>"observeSea",false,0),
	//cooking
	"campfireRefresh":new Recipe("campfireRefresh","Add fuel to the fire","I can supply my campfire, making it last a little bit longer",twoElemFunc("campfire","stick"),()=>"campfireRefresh",false,1),
	"cookCrab":new Recipe("cookCrab","Cook a crab","I don't even have to pry its slimy meat out of its shell.",twoElemFunc("campfire","crab"),()=>"cookCrab",false,1),
	"cookCritter":new Recipe("cookCritter","Cook a critter","This animal is peculiar, but nothing tastes worse when cooked.",twoElemFunc("campfire","critter"),()=>"cookCritter",false,1),
	//altar
	"altarStart": new Recipe("altarStart","Search the myserious altar","This place is creepy and unsettling. What can I hope to accomplish here?",singleElemFunc("altarStart"),()=>"altarStart",false,0),
	
	//leaveIsland
	"leaveIsland": new Recipe("leaveIsland","Leave the island","At last, I have everything I need to escape this place.",threeElemAnyOrderFunc("raft","amulet","distanceShip"),()=>"leaveIsland",false,2),
	
	//herbs
	"healHealingHerb": new Recipe("healHealingHerb","Apply blue flowered herb","I hope this will help me.",twoElemFunc("illness","herb_heal"),()=>"healHealingHerb",false,1),
	"healPoisonHerb": new Recipe("healPoisonHerb","Apply broad leafed herb","I hope this will help me.",twoElemFunc("illness","herb_poison"),()=>"healPoisonHerb",false,1),
	"healVisionHerb": new Recipe("healVisionHerb","Apply foul smelling herb","I hope this will help me.",twoElemFunc("illness","herb_vision"),()=>"healVisionHerb",false,1),
	"ingestHerbHeal": new Recipe('ingestHerbHeal',"Ingest blue flowered herb","This is one way of figuring out what it does",singleElemFunc("herb_heal"),()=>"ingestHerbHeal",false,0),
	"ingestHerbPoison": new Recipe('ingestHerbPoison',"Ingest broad leafed herb","This is one way of figuring out what it does",singleElemFunc("herb_poison"),()=>"ingestHerbPoison",false,0),
	"ingestHerbVision": new Recipe('ingestHerbVision',"Ingest foul smelling herb","This is one way of figuring out what it does",singleElemFunc("herb_vision"),()=>"ingestHerbVision",false,0),
	"madnessHealingHerb": new Recipe("madnessHealingHerb","Apply blue flowered herb","This seems like a good idea, doesn't it?",twoElemFunc("madness","herb_heal"),()=>"madnessHealingHerb",false,1),
	"madnessPoisonHerb": new Recipe("madnessPoisonHerb","Apply broad leafed herb","This seems like a good idea, doesn't it?",twoElemFunc("madness","herb_poison"),()=>"madnessPoisonHerb",false,1),
	"madnessVisionHerb": new Recipe("madnessVisionHerb","Apply foul smelling herb","This seems like a good idea, doesn't it?",twoElemFunc("madness","herb_vision"),()=>"madnessVisionHerb",false,1),
	
	//occult
	
	"riteFood": new Recipe("riteFood","Sacrifice food","I don't think this food item is good enough for the response. But maybe it is good enough for something else",riteFoodFunc,()=>"riteFood",false,3),
	"riteFoodGood": new Recipe("riteFoodGood","Sacrifice food","This dish would suffice for the response. I need a title for a proper response. Still, maybe something will respond without a title.",threeElemAnyOrderFunc("altar","blood","critterCooked"),()=>"riteFood",false,3),
	"riteAscention": new Recipe("riteAscention","Rite of Ascention","I have everything I need. I don't hope, I am certain",ascentionFunc,()=>"riteAscention",false,3),
	"riteGuidance": new Recipe("riteGuidance","Sacrifice only my blood","All sacrifices require blood. I think. I can add something else.",twoElemFunc("altar","blood"),()=>"riteGuidance",false,3),
	"getTitle3": new Recipe("getTitle3","Reach towards the Sea Monster","Maybe I could connect with it.",twoElemAnyOrderFunc("unity","distanceMonster"),()=>"getTitle3",false,1),
	"getTitle2": new Recipe("getTitle2","Reach towards the amulet","This amulet must be important. Maybe it can guide me.",twoElemAnyOrderFunc("unity","amulet"),()=>"getTitle2",false,1),
}

const allHints = {
	"test1": new Recipe("test1","Test Recipe 1","This is a description of a test recipe 1. This is a hint",testFuncShow1,null,true),
	"mountainTreck": new Recipe("mountainTreck","Prepare a treck into the moutain","I could venture into the mountains, but I'll need at least one food item.",singleElemFunc("mountain"),null,true,2),
	"mountainTreckStart": new Recipe("mountainTreck","Prepare a treck into the moutain","I could venture into the mountains, but I'll need at least one food item.",singleElemFunc("mountainStart"),null,true,1),
	"stickHint": new Recipe("stickHint","Craft with a stick","I can't do much with just one stick. But if I added something more, I could craft something.",singleElemFunc("stick"),null,true,1),
	"campfireHint": new Recipe("campfireHint","Craft with a campfire","I could cook something. Or add fuel",singleElemFunc("campfire"),null,true,1),
	"stoneHint": new Recipe("stoneHint","Craft with a stone", "I could turn this stone into something useful, if only I had more.",singleElemFunc("stone"),null,true,1),
	"logHint": new Recipe("logHint","Craft with a log", "I could chop it into smaller pieces. Or, with more logs, I could begin making a raft.",singleElemFunc("log"),null,true,1),
	"axeHint": new Recipe("axeHint","Craft with an axe", "I could chop something up.",singleElemFunc("axe"),null,true,1),
	"raftHint": new Recipe("raftHint","Finish the raft", "I need 3 more logs to finish the raft.",singleElemFunc("unfinishedRaft"),null,true,3),
	
	"leaveRaftHint": new Recipe("leaveRaftHint","Leave the island","My raft can't take me back home, but it can bring me to a nearby ship. There is also a problem of the nearby sea monster",singleElemFunc("raft"),null,true,2),
	"leaveShipHint": new Recipe("leaveShipHint","Leave the island","I can see the ship in the distance, but I still need to get to it. They won't wait for me forever. And if I don't deal with it, the sea monster will sink us anyway.",singleElemFunc("distanceShip"),null,true,2),
	"amuletHint": new Recipe("amuletHint","The mysterious amulet","I think this amulet will protect me from the sea monster. I could use it to escape. In more ways than one.",singleElemFunc("amulet"),null,true,2),
	
	"illnessHint": new Recipe("illnessHint","My aliment","It hurts. There must be a way to heal myself faster than this.",singleElemFunc("illness"),null,true,1),
	"madnessHint": new Recipe("madnessHint","My mental dificculties","My mind wanders too far. Maybe I can bring it back to Earth.",singleElemFunc("madness"),null,true,1),
	
	"altarHint": new Recipe("altarHint","Perform a ritual?","I stand before the altar. What should I do? What can I do?",singleElemFunc("altar"), null, true, 1),
	"unityHint": new Recipe("unityHint","Commune with other?","I could connect with something. But with what?",singleElemFunc("unity"), null, true, 1),
}

const lastHint = new Recipe("nothing","Nothing","It doesn't seem like I can do anything with this at the moment.",() => true,null,true);

const getRecipe = function(){
	if(mainSlot == null) {
		return null;
	}
	for(const [key, recipe] of Object.entries(allRecipes)){
		if(recipe.funcShow()){
			return recipe;			
		}
	}
	for(const [key, recipe] of Object.entries(allHints)){
		if(recipe.funcShow()){
			return recipe;			
		}
	}
	return lastHint;
}

const onCardChange = function(){
	shownRecipeChange(getRecipe());
}

const dbClickMainSlot = function(){
	cardStore.push(mainSlot);
	mainSlot = null;
	for(let card of additionalSlots){
		cardStore.push(card);	
	}
	additionalSlots = [];
	onCardChange();
}

const dbClickAdditionalSlot = function(cardid){
	const idx = additionalSlots.findIndex(x => x.id == cardid);
	if(idx >= 0){
		const card = additionalSlots.splice(idx,1);
		if(card.length > 0){
			cardStore.push(card[0]);
			onCardChange();		
		}
	}
}

