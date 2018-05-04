# Msic_RCMD Documentation	
	
## How to start servers	
1. From the root directory(plum/src), run the following:  	
    `npm install`  	
	
2. Enter the React directory(plum/src/client) and run the following (It may take a few minutes):  	
	`npm install`  	
	
3. Back to the root directory(plum/src) run:  	
    `npm run dev`  	
    Font-end(React) server and back-end(Express) server will both start. 	
	
4. If one server exits or fails, the other will exit or fail concurrently.	
	
## Components structure	
    App 	
    |---Header  	
    |   |---Search  	
    |   |---Login	
    |	
    |---Navigation	
    |   |---Filer	
    |   |---FilterControl	
    |	
    |---Music	
    |   |---Toolbar	
    |   |---Item	
    |   |   |---Field	
    |   |   |---Button (Save + Delete)	
    |   |	
    |   |---EditPopup	
    |   |---AddPopup
