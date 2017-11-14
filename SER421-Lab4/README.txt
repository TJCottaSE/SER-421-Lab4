SER 421 Web apps and Mobile systems
Lab 4
Clue

For requirements 8, 9, and 10, we chose to implement this as resetting the 
UI/Game Board back to the state of the last user session. We chose to go 
this way with the design due to the fact that we feel like resetting the
game and all of the statistics on refresh hurts the user experience. So as 
it stands, the program will store the guess or accusation history to the
sessionStore for #8, resetting on tab/browswer close, and for #9 the historical
game results will be stored to the localStore, allowing for persistence across 
tab and browser closures. In addition, since the non-functional requirement #4,
seems to indicate that 10 is related to UI persistence, and not user experience,
this only adds to our aforementioned design choices. 

Extra Credit Solution by Tony Cotta 
Tested in the latest versions of Firefox and Chrome for Mac OSX with no
known issues. Also tested in the latest version of Firefox Developer 
Edition. There is a known defect with the way the Developer Edition handles
"this" as it pertains to sub-routines of the drag and drop features. 
Unfortunately this breaks the application under this browswer. In the UI
version the player is free to choose any sub-set of cards to play and they
are not limited to the cards they hold in their hand, more in line with
the traditional game, however if a player were to form a guess with only cards
that they hold the computer would not have any cards to refute the accusation,
so the algorithm does not check against the cards either player holds but rather
only against the solution set to determine the clue given back to the players.