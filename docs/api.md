# Rate My Semester API Documentation

## Endpoints

### /app/

Enters interaction in the logs database with the message "return to the home" and the time the interation occurred.
Allows for the creation of a new account or the ability to login to an existing account.
This is the first page the user will see.

#### Request body:
```
http://localhost:5000/app/
```
### /app/login

This page will show whether a user's login attempt was successful or a failure.
If it was successful they will see their main account page with the ability to view history, update account, logout, or input a new semester.
If it was a failure they will see the login failed page with a redirect back to the home page.

### /app/newacc

This page will show the result of a user's attempt to make a new account.
The user will see the result of their attempt and a redirect to the home page. 

### /app/login/history

This page shows the user's account history. This will show the log of all actions taken by the user, what action it was, and the time that it occurred.

### /app/login/acc

This page shows the user's current account information. From here the user can return home, update their account information, or delete the account.
### /app/login/acc/update

This endpoint is the page where the user's account information is updated. The user is let know that the information has been updated and then redirected to the home page.

### /app/login/delete

This endpoint is the page users will see when they have deleted their account. They will be told that their account has been successfully deleted then returned to the home page.


### /app/login/ratings/

Computes and averages ratings and diffiulties for a the list of professors the user specifified in /app/login.
Also makes a log entry for interacting with this endpoint with the message "computed rating for predetermined professors".

### /app/*/

Returns a 404 NOT FOUND. All other endpoints not listed above will be captured here. 

Enters a log entry for interacting with this endpoint with the message "entered invalid endpoint".

#### Request body:
```
http://localhost:5000/random/
```
#### Response body:
```
404 NOT FOUND
```


