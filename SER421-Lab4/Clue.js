/**
 * Source file for game of Clue.
 * SER 421 Fall B 2017
 * @Author Tony Cotta, Karen Zaunscherb
 * Last Modified 11/9/17
 */

var suspects = ['Miss Scarlet', 'Colonel Mustard', 'Mrs. White', 'Mr. Green', 'Professor Plum'];
var weapons = ['Candlestick', 'Dagger', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'];
var rooms = ['Kitchen', 'Ballroom', 'Conservatory', 'Billiard Room', 'Library', 'Study', 'Hall', 'Lounge', 'Dining Room'];
var playerCards = [];
var computerCards = [];
var solution = [/* Suspect, Weapon, Room */];

/*
*  Welcome the user by getting the value from the form field
*  where the user can enter their name.addElement
*/
function dispUser(){
    var x = document.forms['player'];
    var name = x.elements[0].value;
    console.log('User name is: ' + name);
    document.getElementById('userGreeting').innerHTML = 'Welcome ' + name;
}

/*
*  Function that takes an array and shuffles all the values.
*  @param arrayOfCards the array of cards to shuffle.
*  @return the shuffled array.
*/
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
*  All @params must be passed as 1D arrays.
*  @param suspects the list of possible suspects 
*  @param weapons the list of possible weapons
*  @param rooms the list of possible rooms
*  @return a 3 card array [Suspect, Weapon, Room].
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
*  @param cards the array of cards to be dealt out, Must be even number length
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
* This function pulls data from the guesses form and checks 
* to see if the user has made a winning guess. Then depneding
* on if the guess was correct or not updates the dom to reflect
* a win condition, or reveals one characteristic of the 
* guess that was incorrect. 
*/
function checkGuess(){
	// Get data from form
	var x = document.forms['guesses'];
	var suspect = x.elements[0].value;
	var weapon = x.elements[1].value;
	var room = x.elements[2].value;


	// Show guess
	var node = document.createElement('p'); 
	var textnode = document.createTextNode('Proposed: ' + 
		suspect + ' killed Dr. Black with a ' + weapon + ' in the ' + room +'.');
	node.appendChild(textnode);
	document.getElementById('guessHistory').appendChild(node);
	// ^^ PART OF 8, SHOULD PROBABLY BE MOVED OUT ^^


	// Check for winning solution
	if (solution.includes(suspect) && 
		solution.includes(weapon) &&
		solution.includes(room)){
			document.getElementById('result').innerHTML = 'Winner!!!!! That was the correct guess.';
			// Display restart button
			console.log("WINNNER!!!!!!!");
			removeElement('btn');
			addElement('continue', 'button', 'btn', 'onclick', 'restartGame()', 'Restart');
			// Should remove submit button from drop downs to force player to let computer play
			// Also means it needs to be re-added after computer plays
			// IMPLEMENT THIS

		}
	// Display one wrong part of the guess
	else { 
		if (!solution.includes(suspect)){
			document.getElementById('result').innerHTML = suspect + ' is NOT the killer.';
		}
		else if (!solution.includes(weapon)){
			document.getElementById('result').innerHTML = weapon + ' is NOT the murder weapon.';
		}
		else {
			document.getElementById('result').innerHTML = room + ' is NOT where the murder took place.';
		}
		// Display continue button
		removeElement('btn');
		addElement('continue', 'button', 'btn', 'onclick', 'playCompTurn()', 'Continue');
		// Should remove submit button from drop downs to force player to let computer play
		// Also means it needs to be re-added after computer plays
		// IMPLEMENT THIS

	}
}

/*
*  Function to add an element with dynamic action listener.
*  @param parentElm parent element id tag of the element to be replaced
*  @param elmType type of element to be added (Probably buttons)
*  @param id id tag for newly created element
*  @param attribute ex. onclick, type, class etc.
*  @param value value of the above attribute
*  @param text works best for buttons that utilize the innerHTML as the button text
*/
function addElement(parentElm, elmType, id, attribute, value, text){
	var p = document.getElementById(parentElm);
	var newElement = document.createElement(elmType);
	newElement.setAttribute('id', id);
	newElement.setAttribute(attribute, value);
	newElement.innerHTML = text;
	p.appendChild(newElement);
}

// Removes an element from the document
// @param elementId id attribute of the element to be removed.
function removeElement(elementId) {
	var element = document.getElementById(elementId);
	element.parentNode.removeChild(element);
}

// NEEDS TO BE IMPLEMENTED
function playCompTurn(){
	console.log('Comp Turn played');
}

// NEEDS TO BE IMPLEMENTED
function restartGame(){
	console.log('Restart Game Called');
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
// ^^ This is business logic and not testing code ^^


console.log('Player Cards: ' + playerCards);
console.log('Computer Cards: ' + computerCards);