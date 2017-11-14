SER 421 Web apps and Mobile systems
Tony 'TJ' Cotta
Karen Zaunscherb
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