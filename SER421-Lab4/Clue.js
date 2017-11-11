/**
 * Source file for game of Clue.
 * SER 421 Fall B 2017
 * @Author Tony Cotta, Karen Zaunscherb
 * Last Modified 11/9/17
 */

var suspects = ['Dr. Black', 'Miss Scarlet', 'Colonel Mustard', 'Mrs. White', 'Mr. Green', 'Professor Plum'];
var weapons = ['Candlestick', 'Dagger', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'];
var rooms = ['Kitchen', 'Ballroom', 'Conservatory', 'Billiard Room', 'Library', 'Study', 'Hall', 'Lounge', 'Dining Room'];
var playerCards = [];
var computerCards = [];
var solution = [/* Suspect, Weapon, Room */];

// Welcome the user
function dispUser(){
    var x = document.forms['player'];
    var name = x.elements[0].value;
    console.log('User name is: ' + name);
    document.getElementById('userGreeting').innerHTML = 'Welcome ' + name;
}

// Function that takes an array and shuffles all the values.
// Returns the shuffled array.
function shuffle(arrayOfCards){
	var shuffled = 'false';
	if (arrayOfCards.length == 0){
		shuffled = 'true';
	}
	var size = arrayOfCards.length;
	var ret = new Array();
	var count = 0;
	do {
	    var selector = Math.floor(Math.random() * size);
	    if (!ret.includes(arrayOfCards[selector])){
	    	ret[count] = arrayOfCards[selector];
	    	count++
			if (ret.length == size){
	    		shuffled = 'true';
			}
	    }
	}
	while (shuffled == 'false'); 
	return ret;
}

/*
*  Function that selects the winning combination of suspect,
*  weapon, and room. 3 arrays each representing the total 
*  list of options for each type must be passed to this function.
*  Returns a 3 card array.
*/
function pickWinningCards(suspects, weapons, rooms){
	var sus = suspects[Math.floor(Math.random() * suspects.length)];
	var wep = weapons[Math.floor(Math.random() * weapons.length)];
	var room = rooms[Math.floor(Math.random() * rooms.length)];
	return [sus, wep, room];
}

// Function the strips the solution card from the array.
function stripOutSolution(cards, solution){
	var ret = [];
	var count = 0;
	for (i = 0; i < cards.length; i++){
		if (!cards[i].includes(solution[0]) &&
			!cards[i].includes(solution[1]) &&
			!cards[i].includes(solution[2])){
				ret[count] = cards[i];
				count++;	
		}		
	}
	return ret;
}

/*
*  Deals the cards to each player. 
*  @cards the array of cards to be dealt out, Must be even number length
*  @return returns an array of two arrays, each sub-array
*  contains the cards for the respective players.
*/
function dealCards(cards){
	var pCards = [], cCards = [];
	var count = 0;
	for (i = 0; i < cards.length; i+=2){
		pCards[count] = cards[i];
		cCards[count] = cards[i+1];
		count++;
	}
	return [pCards, cCards];
}

/*
* Creates the list of cards able to be 
shown on the list for display
****STILL NEED TO CREATE PLAYER HAND!!

function stripOutHand(cards, hand){
    var allButHand = [];
	var count = 0;
	for (i = 0; i < cards.length; i++){
		if (!cards[i].includes(deltHand[0]) &&
			!cards[i].includes(deltHand[1]) &&
			!cards[i].includes(deltHand[2])){
				allButPlayer[count] = cards[i];
				count++;	
		}		
	}
	return allButHand;
}

*/

//Populates Suspect List for Dropdown Display
function populateSuspects(){
    for(i=0; i<suspects.length; i++) {  
        document.write('<option value="' + suspects[i] +'">' + suspects[i] + '</option>');
    }
}
//Populates Weapons list for Dropdown Display
function populateWeapons(){
    for(i=0; i<weapons.length; i++) {  
        document.write('<option value="' + weapons[i] +'">' + weapons[i] + '</option>');
    }
}
//Populates Rooms list for Dropdown Display
function populateRooms(){
    for(i=0; i<rooms.length; i++) {  
        document.write('<option value="' + rooms[i] +'">' + rooms[i] + '</option>');
    }
}


// Test the shuffle function
var shuffledSuspects = shuffle(suspects);
var shuffledWeapons = shuffle(weapons);
var shuffledRooms = shuffle(rooms)
console.log(shuffledSuspects);
console.log(shuffledWeapons);
console.log(shuffledRooms);

// Test the pick winner function
solution = pickWinningCards(shuffledSuspects, shuffledWeapons, shuffledRooms);
console.log('The winning combo is ' + solution);

// Test Stripping solution out
var playableSuspects =  stripOutSolution(suspects, solution);
var playableWeapons =  stripOutSolution(weapons, solution);
var playableRooms = stripOutSolution(rooms, solution);
console.log('Playable Suspects: ' + playableSuspects);
console.log('Playable Weapons: ' + playableWeapons);
console.log('Playable Rooms: ' + playableRooms);

// Test Dealing cards
var remainingCards = playableSuspects.concat(playableRooms, playableWeapons);
console.log('All cards shuffled: ' + remainingCards);
// Shuffle and deal the remaining cards
var deltCards = dealCards(shuffle(remainingCards));
playerCards = deltCards[0];
computerCards = deltCards[1];
console.log('Player Cards: ' + playerCards);
console.log('Computer Cards: ' + computerCards);

// Test Cards for Player to Play

