/**
 * Source file for game of Clue.
 * SER 421 Fall B 2017
 * @Author Tony Cotta, Karen Zaunscherb
 * Last Modified 11/9/17
 */

var suspects = ['Miss Scarlet', 'Colonel Mustard', 'Mrs. White', 'Mr. Green', 'Professor Plum','Mrs. Peacock'];
var weapons = ['Candlestick', 'Dagger', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'];
var rooms = ['Kitchen', 'Ballroom', 'Conservatory', 'Billiard Room', 'Library', 'Study', 'Hall', 'Lounge', 'Dining Room'];
var playerTurn = 'true';
var playerCards = [];
var computerCards = [];
var solution = [/* Suspect, Weapon, Room */];
var suspectsDisplay = [], weaponsDisplay = [], roomsDisplay = [];
var compPlaySuspects = [], compPlayWeapons = [], compPlayRooms = [];

/*
*  Welcome the user by getting the value from the form field
*  where the user can enter their name.addElement
*/
function dispUser(){
    
    var x = document.forms['player'];
    var name = x.elements[0].value;
	//console.log('User name is: ' + name);
	sessionStorage.setItem('playerName', name);
    document.getElementById('userGreeting').innerHTML = 'Welcome ' + name;
    removeElement('dispUserSubmit');
    removeElement('player');
    document.getElementById("playerSubmit").disabled = false;
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
*This function pulls data from the guesses form and then checks to see if user has made a winning guess with the checkGuess() function. 
*If the guess is incorrect, it passes it over to the playCompTurn() function for the computer to take a turn
*/

function userTurn(){
    // Get data from form
	var x = document.forms['guesses'];
	var suspect = x.elements[0].value;
	var weapon = x.elements[1].value;
	var room = x.elements[2].value;
	console.log("Guess is: " + suspect + ", " + weapon + ", " + room);
    
    checkGuess(suspect,weapon,room);
}
/*
* This function pulls data from the guesses form and checks 
* to see if the user has made a winning guess. Then depneding
* on if the guess was correct or not updates the dom to reflect
* a win condition, or reveals one characteristic of the 
* guess that was incorrect. 
*/
function checkGuess(suspect,weapon,room){
	// Log guess to session local storage
	var thisGuess = [suspect, weapon, room];
	var allGuesses = JSON.parse(sessionStorage.getItem("allGuesses"));
	if (allGuesses){ // null check
		var len = allGuesses.length;
		allGuesses[len] = suspect;
		allGuesses[len+1] = weapon;
		allGuesses[len+2] = room;
	} 
	else {
		allGuesses = thisGuess;
	} 
	sessionStorage.setItem('allGuesses', JSON.stringify(allGuesses));
	// Check for winning solution
	if (solution.includes(suspect) && 
		solution.includes(weapon) &&
		solution.includes(room)){
			document.getElementById('result').innerHTML = 'GUESS: '+suspect+' with the '+weapon+' in the '+room+'<p><b>Winner!!!!!</b> That was the correct guess.';
			// Display restart button
			//console.log("WINNNER!!!!!!!");
			removeElement('btn');
			addElement('continue', 'button', 'btn', 'onclick', 'restartGame()', 'Restart');
			setWinner();
            document.getElementById("playerSubmit").disabled = true;
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
        //changes the buttons based off of who is playing. If it's player's turn, then it will show the SUBMIT button. If it's the Computer's turn, just the Continue Button will be able to be clicked.
        if (playerTurn == 'true'){
            //changes the buttons
            document.getElementById("playerSubmit").disabled = true;
            playerTurn = 'false';
            removeElement('btn');
            addElement('continue', 'button', 'btn', 'onclick', 'playCompTurn()', 'Continue');

        }
        else{
            //changes the buttons
            document.getElementById("playerSubmit").disabled = false;
            playerTurn = 'true';
            removeElement('btn');
            addElement('continue', 'button', 'btn', 'onclick', 'userTurn()', 'Continue');
            document.getElementById("btn").disabled = true;
        }

	}
}


function playCompTurn(){
    var compGuess = createCompGuess();
    checkGuess(compGuess[0],compGuess[1],compGuess[2]);
}

/*
* Function creates the Computer Guess by randomly choosing suspect, weapon, and room. 
* It then verifies whether or not it's been guessed previously. 
* If it has, then it shoots out a message on console.log and guesses 3 more guesses.
*
*/
function createCompGuess(){
    var compSusGuess = getRandomGuess(compPlaySuspects);
    var compWeapGuess = getRandomGuess(compPlayWeapons);
	var compRoomGuess = getRandomGuess(compPlayRooms);
	var allGuesses = [];
	if (sessionStorage.getItem('allGuesses') != null){
		allGuesses = JSON.parse(sessionStorage.getItem("allGuesses"));
	}
    //var node = document.createElement('p'); 
    for (i = 0; i < allGuesses.length; i+=3){
		if(compSusGuess != allGuesses[i] || 
		   compWeapGuess != allGuesses[i+1] ||
		   compRoomGuess != allGuesses[i+2]){
            return [compSusGuess,compWeapGuess,compRoomGuess];

        }
        else{
            var compSusGuess = getRandomGuess(compPlaySuspects);
            var compWeapGuess = getRandomGuess(compPlayWeapons);
            var compRoomGuess = getRandomGuess(compPlayRooms); 
            console.log("Oops! You already guessed that. Try again.");
        }
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
function restartGame(){
	console.log('Restart Game Called');
	sessionStorage.removeItem('allGuesses');
	sessionStorage.removeItem('playerName');
	if (sessionStorage.getItem('computerCards')){
		sessionStorage.removeItem('computerCards');
		sessionStorage.removeItem('playerCards');
		sessionStorage.removeItem('playerTurn');
		sessionStorage.removeItem('roomDropDown');
		sessionStorage.removeItem('showHistory');
		sessionStorage.removeItem('showRecord');
		sessionStorage.removeItem('solution');
		sessionStorage.removeItem('suspectsDropDown');
		sessionStorage.removeItem('weaponsDropDown');
	}
	mainLoop();
	location.reload(false); // Reloads page from cache.
}

// Show guess
function showHistory(){
	var currentText = document.getElementById('history').innerHTML;
	if (currentText == 'Show History'){
		// print the guess history
		//console.log('show the history');
		document.getElementById('history').innerHTML = 'Hide History';
		var allGuesses = JSON.parse(sessionStorage.getItem("allGuesses"));
		var node = document.createElement('p'); 
		for (i = 0; i < allGuesses.length; i+=3){
			var textnode = document.createTextNode('Proposed: ' + 
				allGuesses[i] + ' killed Dr. Black with a ' + 
				allGuesses[i+1] + ' in the ' + 
				allGuesses[i+2] +'.');
			node.appendChild(textnode);
			node.appendChild(document.createElement('br'));
		}
		document.getElementById('guessHistory').appendChild(node);
	}
	else {
		document.getElementById('history').innerHTML = 'Show History';
		document.getElementById('guessHistory').innerHTML = '';
	}
}


/*
*  Function that shows the historical record of games played and
*  the results.
*/
function showRecord(){
	var currentText = document.getElementById('record').innerHTML;
	if (currentText == 'Show Record'){
		document.getElementById('record').innerHTML = 'Hide Record';
		var history = JSON.parse(localStorage.getItem('gameHistories'));
		var node = document.createElement('p');
		for (i = 0; i < history.length; i+=3){
			var textnode = document.createTextNode(history[i] + 
				': ' + history[i+1] + ' ' + history[i+2] + '.');
			node.appendChild(textnode);
			node.appendChild(document.createElement('br'));
		}
		document.getElementById('gameRecords').appendChild(node);
		var resetStatsBtn = document.createElement('button');
		resetStatsBtn.setAttribute('onclick', 'resetStats()');
		resetStatsBtn.innerHTML = 'Reset Stats';
		document.getElementById('gameRecords').appendChild(resetStatsBtn);
	}
	else {
		document.getElementById('record').innerHTML = 'Show Record';
		document.getElementById('gameRecords').innerHTML = '';
	}
}

// Function that resets the the all time statistics ONLY
function resetStats(){
	localStorage.removeItem('gameHistories');
	showRecord();
}

// Function stores the win/loss record to localStorage
function setWinner(){
	var pName = sessionStorage.getItem('playerName');
	var date = new Date().toDateString();
	var result = '';
	if (playerTurn == 'true'){
		result = 'won';
	}
	else {
		result = 'lost';
	}
	if (pName){
		var h = JSON.parse(localStorage.getItem('gameHistories'));
		if (h) {
			h.push(date, pName, result);
		}
		else {
			h = [date, pName, result];
		}
	}
	else {
		var h = JSON.parse(localStorage.getItem('gameHistories'));
		if (h){
			h.push(date, 'Guest', result);
		}
		else {
			h = [date, 'Guest', result];
		}
	}
	localStorage.setItem('gameHistories', JSON.stringify(h));
}

//Populates Suspect List for Dropdown Display
function populateSuspects(){
    for(i=0; i<suspectsDisplay.length; i++) {  
        document.write('<option value="' + suspectsDisplay[i] +'">' + suspectsDisplay[i] + '</option>');
    }
}

// Repopulates the suspects drop down with stored session values
function repopulateSuspects(){
	var oldSuspects = JSON.parse(sessionStorage.getItem('suspectsDropDown'));
	//console.log(document.getElementById('selectSuspect').childElementCount);
	//console.log(document.getElementById('selectSuspect').firstElementChild);
	for (k = document.getElementById('selectSuspect').childElementCount; k > 1; k--){
		document.getElementById('selectSuspect').remove(document.getElementById('selectSuspect').firstElementChild);
	}
	for (i = 0; i < oldSuspects.length; i++){
		var opt = document.createElement('option');
		opt.innerHTML = oldSuspects[i];
		opt.setAttribute('value', oldSuspects[i]);
		document.getElementById('selectSuspect').appendChild(opt);
	}
	var opt2 = document.createElement('option');
	opt2.innerHTML = 'Choose A Suspect';
	opt2.setAttribute('selected', 'true');
	document.getElementById('selectSuspect').appendChild(opt2);
}

//Populates Weapons list for Dropdown Display
function populateWeapons(){
    for(i=0; i<weaponsDisplay.length; i++) {  
        document.write('<option value="' + weaponsDisplay[i] +'">' + weaponsDisplay[i] + '</option>');
    }
}

// Repopulates the suspects drop down with stored session values
function repopulateWeapons(){
	var oldWeapons = JSON.parse(sessionStorage.getItem('weaponsDropDown'));
	console.log(document.getElementById('selectWeapon').childElementCount);
	console.log(document.getElementById('selectWeapon').firstElementChild);
	for (k = document.getElementById('selectWeapon').childElementCount; k > 1; k--){
		document.getElementById('selectWeapon').remove(document.getElementById('selectWeapon').firstElementChild);
	}
	for (i = 0; i < oldWeapons.length; i++){
		var opt = document.createElement('option');
		opt.innerHTML = oldWeapons[i];
		opt.setAttribute('value', oldWeapons[i]);
		document.getElementById('selectWeapon').appendChild(opt);
	}
	var opt2 = document.createElement('option');
	opt2.innerHTML = 'Choose A Weapon';
	opt2.setAttribute('selected', 'true');
	document.getElementById('selectWeapon').appendChild(opt2);
}

//Populates Rooms list for Dropdown Display
function populateRooms(){
    for(i=0; i<roomsDisplay.length; i++) {  
        document.write('<option value="' + roomsDisplay[i] +'">' + roomsDisplay[i] + '</option>');
    }
}

// Repopulates the room drop down with stored session values
function repopulateRooms(){
	var oldRooms = JSON.parse(sessionStorage.getItem('roomsDropDown'));
	console.log(document.getElementById('selectRoom').childElementCount);
	console.log(document.getElementById('selectRoom').firstElementChild);
	for (k = document.getElementById('selectRoom').childElementCount; k > 1; k--){
		document.getElementById('selectRoom').remove(document.getElementById('selectRoom').firstElementChild);
	}
	for (i = 0; i < oldRooms.length; i++){
		var opt = document.createElement('option');
		opt.innerHTML = oldRooms[i];
		opt.setAttribute('value', oldRooms[i]);
		document.getElementById('selectRoom').appendChild(opt);
	}
	var opt2 = document.createElement('option');
	opt2.innerHTML = 'Choose A Room';
	opt2.setAttribute('selected', 'true');
	document.getElementById('selectRoom').appendChild(opt2);
}

/*
*Sorts the card Types. If it's in each array, it gets put into another array.
*/
function sortCardType(arr1, arr2, arr3){
    for(var i = 0; i < arr1.length; i++){
        for(var j = 0; j < arr2.length; j++){ // j < is missed;
            if(arr1[i] == arr2[j]){
        		arr3.push(arr1[i]); 
        	}
       }
    }
}

/*
Computer's Function to randomly select one Suspect, one Weapon, and one Room, all from not in the Computer's hand. 
**TODO: If guess exists, choose again.
*/
function getRandomGuess(arr) {
  guess = arr[Math.floor(Math.random() * arr.length)];
    return guess;
}

/*
*  Function that resets all session storage and local storage,
*  intended for use on page reloads.
*/
function checkExistingSession(){
	if (sessionStorage.getItem('playerCards') != null){
		playerTurn = sessionStorage.getItem('playerTurn');
		playerCards = JSON.parse(sessionStorage.getItem('playerCards'));
		computerCards = JSON.parse(sessionStorage.getItem('computerCards'));
		solution = JSON.parse(sessionStorage.getItem('solution'));
		showHistory2 = sessionStorage.getItem('showHistory');
		showRecord2 = sessionStorage.getItem('showRecord');
		// Reset the UI to match session history values
		document.getElementById("cardHand").innerHTML = playerCards.join(", ");
		repopulateSuspects();
		repopulateWeapons();
		repopulateRooms();
		if (playerTurn == 'true'){
			document.getElementById('playerSubmit').disabled = true;
		}
		else {
			document.getElementById('playerSubmit').disabled = false;
		}
		if (showHistory2 == 'true'){
			showHistory();
		}
		if (showRecord2 == 'true'){
			showRecord();
		}
	}
}

// Stores Session values when the browswer window or tab is closed
function setSessionValues(){
	// Piece for greeting here KAREN LOOK AT THIS
	
	sessionStorage.setItem('playerTurn', playerTurn);
	sessionStorage.setItem('playerCards', JSON.stringify(playerCards));
	sessionStorage.setItem('computerCards', JSON.stringify(computerCards));
	sessionStorage.setItem('solution', JSON.stringify(solution));
	if (document.getElementById('history').innerHTML == 'Show History'){
		sessionStorage.setItem('showHistory', 'false');
	}
	else {
		sessionStorage.setItem('showHistory', 'true');
	}
	if (document.getElementById('record').innerHTML == 'Show Record'){
		sessionStorage.setItem('showRecord', 'false');
	}
	else {
		sessionStorage.setItem('showRecord', 'true');
	}
	sessionStorage.setItem('suspectsDropDown', JSON.stringify(suspectsDisplay));
	sessionStorage.setItem('weaponsDropDown', JSON.stringify(weaponsDisplay));
	sessionStorage.setItem('roomsDropDown', JSON.stringify(roomsDisplay));
}

function mainLoop(){
// Test the shuffle function
var shuffledSuspects = shuffle(suspects);
var shuffledWeapons = shuffle(weapons);
var shuffledRooms = shuffle(rooms)
//console.log(shuffledSuspects);
//console.log(shuffledWeapons);
//console.log(shuffledRooms);

// Test the pick winner function
solution = pickWinningCards(shuffledSuspects, shuffledWeapons, shuffledRooms);
console.log('The winning combo is ' + solution);

// Test Stripping solution out
var playableSuspects =  stripOutSolution(suspects, solution);
var playableWeapons =  stripOutSolution(weapons, solution);
var playableRooms = stripOutSolution(rooms, solution);
//console.log('Playable Suspects: ' + playableSuspects);
//console.log('Playable Weapons: ' + playableWeapons);
//console.log('Playable Rooms: ' + playableRooms);

// Test Dealing cards
var remainingCards = playableSuspects.concat(playableRooms, playableWeapons);
//console.log('All cards shuffled: ' + remainingCards);


// Shuffle and deal the remaining cards
var deltCards = dealCards(shuffle(remainingCards));
playerCards = deltCards[0];
computerCards = deltCards[1];
// ^^ This is business logic and not testing code ^^

//Sorts out all of the players cards by Suspect, Weapon, and Room, then removes them from the list of Suspects, Weapons, and Rooms for Display
var allCards = suspects.concat(weapons, rooms);
var suspectsSeperated = [];
var suspectsSep2 = sortCardType(playerCards,suspects,suspectsSeperated);
suspectsDisplay = stripOutSolution(suspects, suspectsSeperated);
var weaponsSeperated = [];
var weaponsSep2 = sortCardType(playerCards,weapons,weaponsSeperated);
weaponsDisplay = stripOutSolution(weapons, weaponsSeperated);
var roomsSeperated = [];
var roomsSep2 = sortCardType(playerCards,rooms,roomsSeperated);
roomsDisplay = stripOutSolution(rooms, roomsSeperated);

//Creates the cards which the computer can play with
var compSuspectsSep = [];
var compSuspectsSep2 = sortCardType(computerCards,suspects,compSuspectsSep);
compPlaySuspects = stripOutSolution(suspects, compSuspectsSep);
var compWeaponsSep = [];
var compWeaponsSep2 = sortCardType(computerCards,weapons,compWeaponsSep);
compPlayWeapons = stripOutSolution(weapons, compWeaponsSep);
var compRoomsSep = [];
var compRoomsSep2 = sortCardType(computerCards,rooms,compRoomsSep);
compPlayRooms = stripOutSolution(rooms, compRoomsSep);
}

mainLoop();
//Test Card Hands
//console.log('Player Cards: ' + playerCards);
//console.log('Computer Cards: ' + computerCards);
//console.log("allCards:"+allCards);

//Test Cards for Display
//console.log("Suspects for Display: "+suspectsDisplay);
//console.log("Weapons for Display: "+weaponsDisplay);
//console.log("Rooms for Display: "+roomsDisplay);

//Test Computer's Playable Cards

//console.log("Suspects for Computer: "+compPlaySuspects);
//console.log("Weapons for Computer: "+compPlayWeapons);
//console.log("Rooms for Computer: "+compPlayRooms);

// UI Business
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function resetDnD(){
	var numRooms = document.getElementById('div1').childElementCount;
	for (i = 0; i < numRooms; i++){
		var room = document.getElementById('div1').firstElementChild;
		var numCards = room.childElementCount;
		for (j = 0; j < numCards; j++){
			var subElement = room.firstElementChild;
			if (subElement.getAttribute('id') == 'ColMustard' ||
				subElement.getAttribute('id') == 'MissScarlet' ||
				subElement.getAttribute('id') == 'MrGreen' ||
				subElement.getAttribute('id') == 'MrsPeacock' ||
				subElement.getAttribute('id') == 'MrsWhite' ||
				subElement.getAttribute('id') == 'ProfPlum'){
					var charPane = document.getElementById('playerPane');
					charPane.appendChild(subElement);
			}
			else if (subElement.getAttribute('id') == 'candlestick' ||
					subElement.getAttribute('id') == 'knife' ||
					subElement.getAttribute('id') == 'leadpipe' ||
					subElement.getAttribute('id') == 'revolver' ||
					subElement.getAttribute('id') == 'rope' ||
					subElement.getAttribute('id') == 'wrench'){
						var weapPane = document.getElementById('weaponPane');
						weapPane.appendChild(subElement);
					}
		}
		var addBack = document.getElementById('div1').firstElementChild;
		document.getElementById('div1').firstElementChild.remove();
		document.getElementById('div1').appendChild(addBack);
	}
}





















