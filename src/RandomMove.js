import { tabNames } from "./constants";

class RandomMove {
	static getRandomType(probs) {
		var target = Math.random()
		var runningProb = 0
		var i;
		for (i = 0; i < probs.length; i++) {
			if(target >= runningProb && target <= runningProb + probs[i]) {
			// add 1 to skip the first tab "All"
				return tabNames[i + 1]
			}
			runningProb += probs[i]
		}
		// error, should not reach this line. User probably input invalid probs
		return tabNames[i]
	}

	// adds a random move based on probabilities
	static getRandomMove(currentSet, moveList, probs) {
		var lastAddedType = tabNames[0]
		// select uniform random if no previous added move
		if(currentSet.length == 0) {
			// subract first type
			var uniformProbs = Array(tabNames.length - 1).fill(1/(tabNames.length - 1))
			lastAddedType = this.getRandomType(uniformProbs)
		} else {
			lastAddedType = currentSet[currentSet.length - 1].type
		}
		var filteredList = []
		// if user does not have moves in each category, keep picking random one until we find one with moves
		while(filteredList.length == 0) {
			var newType = this.getRandomType(probs[lastAddedType])
			filteredList = moveList.filter(move => move.type == newType);
		}
		
		// get random move of that type and make shallow copy
		var newMove = Object.assign({}, filteredList[Math.floor(Math.random() * filteredList.length)])

		// var reverse = Math.round(Math.random());
		var reverse = Math.random();
		// add a random move reverse version half the time
		if (reverse >= 0.5 && newMove.reversible) {
			newMove.reverseEnabled = true;
		}
		return newMove
	}
}

export default RandomMove;