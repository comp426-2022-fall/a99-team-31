# Rate My Semester
This is the final project for Group 31 - Lesli Ramos, Shriya Mandal and Ryan Erickson.

## Summary
Rate My Semester is an application which leverages Rate My Professor's ratings in order to help UNC students better plan out their semesters. UNC students are able to enter the professors for their courses, and Rate My Semester will return a computed average difficulty and rating for the professors they inputted. We hope that due to this, students will be able to make a more informed decision for their semester courses, and be able to get this information at a single glance instead of having to do calculations themselves.

Students will be able to create an account, log in, input up to 5 professors for their semester, and find the average rating and difficulty among their professors. Additionally, they can view logs of their interactions with the frontend, delete their account and change their username and password. 

In order to retrieve information from Rate My Professor, we were able to find a [npm package for Rate My Professors created by Michigan Tech students](https://www.npmjs.com/package/@mtucourses/rate-my-professors). This package was configured so that ratings for UNC professors would be returned, and the API returns a difficulty and rating, among other information for a single professor at a time. 

## Setup 

1. Clone this repository from GitHub
2. Run `npm install` in the directory of this repository to install of the dependencies needed for our project.
3. Run `npm start`
4. Navigate to ```localhost:5000/app/``` on your browser to get started!

`CTRL+C` will end the application once you are finished with it! We also support the `npm test` command, you will be able to begin the application at ```localhost:5000/app/```.

## Dependencies
- @mtucourses/rate-my-professors (2.2.0)
- better-sqlite3 (8.0.1)
- body-parser (1.20.1)
- ejs (3.1.8)
- express (4.18.2)
- minimist (1.2.7)
- path (0.12.7)
- url (0.11.0)

## API Endpoints
We have added documentation for our API in this [file](https://github.com/comp426-2022-fall/a99-team-31/blob/main/docs/api.md). The API documentation also includes what happens to the databases to provide further clarity. 

## Team Planning
We have a detailed breakdown of our planning process in this [file](https://github.com/comp426-2022-fall/a99-team-31/blob/main/docs/planning.md). Overall, we did well on the planning aspect and were able to get our vision for the application completed in a timely manner, as well as be an useful application for UNC students as is. 

## Roles
We assigned roles during our initial meetings, and detailed the roles as well as what each role would do in this [file](https://github.com/comp426-2022-fall/a99-team-31/blob/main/docs/roles.md). However we weren't limited to just these roles -- everyone on the team was able to help each other and work together if we faced issues doing our part of the project. 

## Interactions
[Here](https://github.com/comp426-2022-fall/a99-team-31/blob/main/docs/interactions.md) is a detailed list of each of the pages in our user interface, which was built using EJS. We aimed to make it simple for students to use. 

## Future Extensions
We achieved a lot in a few weeks, but there are still things we'd like to work on in the future. These include technical improvements and more features, and are detailed on [this page](https://github.com/comp426-2022-fall/a99-team-31/blob/main/docs/future-extensions.md).

## Demo Video
Watch our demo video [at this link](https://youtu.be/Zi0GImtBjkU)! We're proud of what we have achieved over the past two weeks and hope that our application can be of use to UNC students.
