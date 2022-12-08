
# Future Extensions

We're incredibly proud of what we achieved within a few weeks, and hope that our tool will be useful for UNC students. However, we did have a limited amount of time and were not able to add every feature we wanted to. Here are some extensions we'd like to make the future. 

### Fix issue where user is logged out after returning to home page after viewing rating/difficulty
Currently, the user is logged out after attempting to return to the home page. In the future, we'd like them to return back to the home page so they can compute more ratings, instead of logging them out. 

### Allow user to enter more than 5 professors
Currently, the user interface only supports up to 5 professors being added, while our API is able to support more than 5. Students sometimes take more than 5 courses, and it would be good to allow this functionality, perhaps by letting the user add more form fields to the UI for entering in professors. 

### More user friendly user interface
In the future, we'd like to add a more user friendly and appealing interface. As this was a prototype, we focused more on the functionality than the design and if we had more time, we would spend some time making the application easier and pleasing to use. We would also like to have a separate page for account management features such as updating password/username, viewing logs, etc instead of having them on the home page.

### Keep password field secret and input restrictions on passwords/usernames
Currently, the password entered is visible to the user, and we'd like to change this so that becomes secret (for instance *** characters). As well, we would like to add some restrictions to passwords and usernames, as currently there is no restriction on length, characters contained, etc. This will help make our authenication system stronger.

### Add logs to remember what professors were inputted and the corresponding rating/difficulty
Currently, we only have logs of the user's interactions on the frontend. In the future, we'd like to log these pieces of data too so that a user can input different combinations and have this information saved and be able to compare it.

### Take into account more than just teacher ratings and difficulty from RateMyProfessor.
Currently, the way we're calculating rating and difficulty is fairly simple, and it could use some more data points, such as using data from departments, the subject of the courses and potentially user ratings inputted in our own application. This would make our application more accurate, as Rate My Professor ratings and difficulty aren't always accurate.
