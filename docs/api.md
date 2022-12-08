# Rate My Semester API Documentation

## Endpoints

### /app/

Responds "200 OK".

Enters interaction in the logs database with the message "return to the home" and the time the interation occurred.

#### Request body:
```
http://localhost:5000/app/
```
#### Response body:
```
200 OK
```

### /app/ratings/

Computes and averages ratings for a predetermined list of professors in the CS department.
 
Enters the rating information in the data database in the row of the corresponding user.

Also makes a log entry for interacting with this endpoint with the message "computed rating for predetermined professors".

#### Request body:
```
http://localhost:5000/app/ratings/
```
#### Response body:
```
{"teachers":["kris jordan","john martin","brent munsell","ketan mayer patel"],"averageRating":"4.33"}
```


### /app/ratings/:teachers/

Computes and averages ratings for an user inputted list of professors at UNC.

An user or a function calling this endpoint should format their parameters in the following way: 

firstName-lastName (for each teacher name)

a **+** sign between each professor they wish to input. For instance:

kris-jordan+john-martin would return the ratings for professors Kris Jordan and John Martin, averaged out.

Enters the list of professors and average rating for the corresponding user in the data database

Makes a log entry for interacting with this endpoint with the message "computed rating for user professors".


#### Request body:
```
http://localhost:5000/app/ratings/kris-jordan+john-martin/
```
#### Response body:
```
{"teachers":["kris jordan","john martin"],"averageRating":"4.25"}
```

### /app/difficulty/

Computes and averages difficulty for a predetermined list of professors in the CS department.

Enters the average difficulty in the data database in the row of the corresponding user.

Also makes a log entry for interacting with this endpoint with the message "computed difficulty for predetermined professors".

#### Request body:
```
http://localhost:5000/app/difficulty/
```
#### Response body:
```
{"teachers":["kris jordan","john martin","brent munsell","ketan mayer patel"],"averageDifficulty":"3.55"}
```

### /app/difficulty/:teachers/

Computes and averages difficulty for an user inputted list of professors at UNC.

An user or a function calling this endpoint should format their parameters in the following way: 

firstName-lastName (for each teacher name)

a **+** sign between each professor they wish to input. For instance:

kris-jordan+john-martin would return the difficulty for professors Kris Jordan and John Martin, averaged out.

Enters the list of professors and average difficulty for the corresponding user in the data database

Makes a log entry for interacting with this endpoint with the message "computed difficulty for user professors".

#### Request body:
```
http://localhost:5000/app/difficulty/kris-jordan+john-martin/
```
#### Response body:
```
{"teachers":["kris jordan","john martin"],"averageDifficulty":"3.10"}
```

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


