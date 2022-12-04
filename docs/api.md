# Rate My Courses API Documentation

## Endpoints

### /app/

Responds "200 OK".

### /app/ratings/

Computes and averages ratings for a predetermined list of professors in the CS department.

### /app/ratings/:teachers/
 
Computes and averages ratings for an user inputted list of professors at UNC.

An user or a function calling this endpoint should format their parameters in the following way: 

firstName-lastName (for each teacher name)

a **+** sign between each professor they wish to input. For instance:

kris-jordan+john-martin would return the ratings for professors Kris Jordan and John Martin, averaged out.

### /app/difficulty/

Computes and averages difficulty for a predetermined list of professors in the CS department.

### /app/difficulty/:teachers/
 
Computes and averages difficulty for an user inputted list of professors at UNC.

An user or a function calling this endpoint should format their parameters in the following way: 

firstName-lastName (for each teacher name)

a **+** sign between each professor they wish to input. For instance:

kris-jordan+john-martin would return the difficulty for professors Kris Jordan and John Martin, averaged out.

### /app/*/

Returns a 404 NOT FOUND. All other endpoints not listed above will be captured here. 
