class Deck{
	constructor(template){
		this.template = template;
		this.deck = [...template];
	}
	getAType(){
		const drawIdx = Math.floor(Math.random() * this.deck.length);
		const draw = this.deck.splice(drawIdx,1)[0];
		if(this.deck.length == 0){
			this.deck = [...this.template];	
		}
		return draw;
	}
}

const beachEmpty = new Deck( ["crab","crab","crab","crab","crab","stick","nothing","nothing","nothing","nothing"]);
const beachStick = new Deck( ["crab","crab","crab","crab","crab","stick","crab","nothing","nothing","nothing"]);
const beachSharp = new Deck( ["crab","crab","crab","crab","crab","stick","crab","crab","nothing","nothing"]);
const beachAxe = new Deck( ["crab","crab","crab","crab","crab","crab","crab","crab","crab","nothing"]);

const forestEmpty = new Deck( ["berries","berries","berries","berries","berries","stick","stick","herb_heal","herb_poison","nothing"]);
const forestStick = new Deck( ["berries","berries","berries","berries","berries","stick","stick","berries","berries","nothing"]);
const forestStone = new Deck( ["berries","berries","berries","stick","stick","stick","stick","herb_heal","herb_poison","nothing"]);
const forestSharp = new Deck( ["berries","berries","herb_heal","herb_heal","herb_heal","herb_poison","herb_poison","herb_poison","nothing","nothing"]);

const mountainEmpty = new Deck( ["stone","stone",'herb_heal','herb_poison','herb_vision',"nothing","nothing","nothing","nothing","nothing"] );
const mountainStick = new Deck( ["stone","stone",'herb_heal','herb_poison','herb_vision',"stone","stone",'herb_poison','herb_vision',"nothing"] );
const mountainStone = new Deck( ["stone","stone","stone","stone","stone","stone","stone","nothing","nothing","nothing"] );
const mountainSharp = new Deck( ['herb_heal','herb_poison','herb_heal','herb_poison','herb_vision','herb_vision','herb_vision','herb_heal','nothing',"nothing"] );
const mountainAxe = new Deck( ['critter','critter','critter','critter','critter','critter','critter','critter','nothing',"nothing"] );

const craftCampfire = new Deck(['campfire','campfire','nothing']);
const drawingBlood = new Deck(['nothing','nothing','nothing','nothing','illness']);
const observeSea = new Deck(["distanceShip","distanceMonster","distanceMonster","distanceNothing","distanceNothing","distanceNothing"]);
observeSea.deck = ["distanceMonster"];

const healIllnessWithHerb = new Deck([true,true,true,false,false]);
healIllnessWithHerb.deck = [true];

const seaMonsterGifts = new Deck(["fish","fish","fish","fish","preserved","preserved"]);