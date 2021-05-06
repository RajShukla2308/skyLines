1)This app is for booking , updating and deleting flights. 
2)Backend of the app is in nodeJS, expressJS and front end is in Angular. 
3)Start the app by booking flights.

Steps for making the code work(backend):

1)Make a folder of your choice in your desktop, open this folder in visual studio code , right click on the folder and press 'Open in terminal'.

2)In the terminal , type 'npm init';

3)Fill the answers according to questions. when it is asking starting of the file , enter app.js(if you dont know anything , just keep pressing enter key)

4)it will install all the dependencies for the project including 'node modules' folder. if it doesnt , please type command 'npm install'.Now you will see the folder 'node modules'. 5)Change the 'src' folder of project with downloaded 'src' folder. / copy this src folder and paste it there.

6)open src folder in terminal and type command 'node app.js' , it will start the project.


---------------------------------------------------------------------------------------------------

This Repository includes front end code for Skylines - An app for Flight Booking

Steps for making the code work(Forntend):

1)Make a folder of your choice in your desktop, open this folder in visual studio code , right click on the folder and press 'Open in terminal'.

2)In the terminal , type 'ng new bookingapp';

3)it will install all the dependencies for the project including 'node modules' folder.

4)Change the 'src' folder of project with downloaded 'src' folder.

5)Go to app folder, open it with terminal and type the command 'ng serve --o'. It will launch the project

Note - a) If css or bootstrap is not working , open angular.json file and add the dependency "../node_modules/bootstrap/dist/js/bootstrap.min.js" in scripts property. 
b) open src folder , add the following command in styles.css == @import "~bootstrap/dist/css/bootstrap.css";

