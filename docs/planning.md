A detailed breakdown of our planning process. Throughout the course of the project, we updated each other on GroupMe and held meetings on Zoom. 

## Meeting 1: 11/20 @ 7PM
[Link to discussion post](https://github.com/orgs/comp426-2022-fall/teams/group-31/discussions/2)

This is the first time we got together and we figured out requirements as well as our project idea: Rate My Semester. 

Requirements:

* Documentation of planning
* An API with defined endpoints and documentation (using express.js)
* An front end interface which interacts with API and stores/retrieves user info (possibly React)
* Documentation for users

Project Idea:

API which returns information from RateMyProfessor (via scraping?), returns professor score and difficulty, and in the frontend you can input in classes and professor, get an overall quality+difficulty score for your schedule. Possibly just for CS classes/professors, could have professor quality+difficulty on a database

* Backend: having a scraper for RateMyProfessor, API runs the scraper function and has endpoints to retrieve professor information by name/professor ID
* Frontend: user enters courses, difficulty and quality of schedule is computed

## Meeting 2: 11/27 @ 8:30 PM
Assigning out roles for major components of the project:
* server.js and API Backend - Shriya
* Databases - Lesli
* Frontend - Ryan
* More information on these roles can be found in the roles.md document
* Documentation and Demo Video - all shared, whoever works on a component can add the documentation

Other Notes:
* Looked at new requirements for project
* Shriya found a package on npmjs.com to get RateMyProfessor data, and got it to work 
[Here is the package we're using](https://www.npmjs.com/package/@mtucourses/rate-my-professors)
* We will likely work on the project next week, finishing it by midnight on Thursday

## Meeting 3: 12/06 @ 7PM
* Dicussed finished backend and Shriya showed a demo of how to use the API 
* Lesli and Ryan now be working on database and frontend until Thursday afternoon 
* Looked at further requirements for the project and what we need to add to our API and frontend
* Will be doing documentation and demo video on final meeting Thursday 12/08

## Meeting 4: 12/07 @ 10PM
This was an unscheduled meeting we decided to have to update each other on the progress of each of our components, as well as figure out any issues with the database or frontend.
* Mitigated issues with styling not showing up
* Discussed features we would add to the database, such as username, password, logs of interactions
* Discussed pages to be added to the frontend and how we would request information from the API from the frontend
* Discussed any changes needed to be made to the API from how we had originally done it

## Meeting 5: 12/08 @ 3pm
This is the final meeting for our team. Going into this meeting, we were mostly done with the technical aspects of the project, and only needed to fix a couple of things. 
* Solved some issues such as the database not deleting users properly, added form to change username and password
* Connected frontend to backend and databases properly  
* Added thorough documentation for each of our parts including the API and user interactions
* Added comments for each of our code
* Tested out the application and made sure we met the rubric on each criteria
* Filmed demo video
* Meeting finished with PR made and README updated.
