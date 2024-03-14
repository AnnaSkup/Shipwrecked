var drawAllCards = ()=>{};
var clearAllPopups = () => {};
var mainSlot = null;
var additionalSlots = [];
var actionsList = [];
var redrawTimedCards = () => {};

const formatFloat = (f) => {
	if(f > 10){
		return parseInt(f);
	}else{
		return parseFloat(f.toFixed(2))
	}
}
const longestFoodIds = new Set(['critterCooked']);
const longFoodIds = new Set(["crabCooked","critter"]);
const foodIds = new Set(["fish","crab","berries","preserved",]);

const allFoodIds = new Set([...foodIds, ...longFoodIds, ...longestFoodIds])