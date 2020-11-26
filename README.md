# note-taker-11.17.20

## About The Project

---

![alt text](images/image3.PNG)

![alt text](images/Image1.PNG)

![alt text](images/Image2.PNG)

This application is about Note Taker from Command Line Interface
This application allows user to add notes.
First applicatin displays previous saved notes in Note Taker section in left side of the app.
In the middle of app displays with place holders as Note Title and Note Text,user can enter Note
Title and Note Text in place holder's section and click save button on right side of the upper corner,
refresh the page then newly added notes will be added to Note Taker section.If user wants add more notes ,
user can click on pen symbol on right side of the upper corner and can enter note title and text and click on save button.
if user wants delete notes from the Note Taker list items,need to click on delete button besides the note in Note Taker section,that perticular item will be deleted from the list.

## Implemented the following functionalities

-    apiRoutes.js : to read the notes from db and display in browser and add new notes to db.

-    html-routes.js : to display index.html when user trying to open the application with local host and
     notes.htmL when click on Get Stared button.

## Built With

Node modules

-    express
-    fs : to interact with I/O file system
-    path : to create the directory

## Challenges

-    Get challenged while developing api routes for fetching data from db to display on browser
     and finally figured out thru creating, const router = require("express").Router() and export router.
-    App is working as expected in local but after deployed to Heroku ,the post and delete methods are not working as
     app taking too long for read and write file.Error logs says timeout for post and delete methods.
     contacted the following:
     -    AskBCS Learning Assistant: they mentioned due to read and File system in api routes, app in not working on Heroku,
          then i removed read and write files and tried to save the notes but the saved data is not remaining in db.json file,
          it will be disappeared once the app close.
     -    Contacted TA tried different ways but didn't work.
     -    Spent four days continuously to fix the issue,but still issue in Heroku app, read and write file system in API routes
          causing issue.

## Getting Started

To get a local copy up and running follow below steps.

## Prerequisites

None

## Installation instructions:

Clone the repo git clone git@github.com:NirmalaAbothu/note-taker-11.17.20.git then open Git Bash window ,navigate to project folder,run
following commands

-    run "npm install" or "npm i"
-    run "npm run watch" to make server updates for our changes
-    run "node app.js"
-    if you get any error saying that perticular package cann't find, please install that specific package by runnig following command
     run "npm run packagename(wahtever package missed)"

after run the above command,then go to browser and type localhost:3000 and follow the below steps

-    Click on Get Started button
-    Enter Note title and Note text, click on save button and refresh page,we can see newly added note
-    For delete note ,click on delete button beside the note in left side of the app in Note Taker section and refresh button
     note will be deleted from Note Taker section.

## Credits

Followed the documentation about api routes

## License & copyright

Copyright © 2020 Nirmala Abothu

## Project heroku deplyed link

[Note Taker](https://arcane-cliffs-33965.herokuapp.com/notes)
