# Rate My Semester API Documentation

## Endpoints

### /app/

Responds "200 OK".

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

#### Request body:
```
http://localhost:5000/random/
```
#### Response body:
```
404 NOT FOUND
```


