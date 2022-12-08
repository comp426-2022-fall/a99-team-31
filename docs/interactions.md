# Rate My Semester Interaction Documentation

## Each HTML page and how the user interacts with it

### acc.ejs
This is the page shown when the user wants to view their account information. The page will display the users username and password as well as give the user options to change their account information, delete their acccount, or return home.

### create-fail.ejs
This is the page shown when a user wants to create a new account but that account already exists. There is also a button to go back to the home page.

### create-succ.ejs
This is the page shown when a user has successfully created a new account. There is a button to go back to home page after the account has been created.

### deleted.ejs
This is the page shown after a user has chosen to delete their account. The account has been deleted and user can click a button to go back to the home page.

### history.ejs
This is the page shown when a user wants to view their account history. There is a full list of all actions taken by that account. At the bottom there is a button to return home.

### home.ejs
This is the first page a user sees. They have 2 options, to either create a new account or login to an existing account. There are text boxes and buttons for the user to login or make a new account.

### login-fail.ejs
This is the pae that is shown when a user tries to login to an account with the wrong username or password. They are redirected to the home page from this page.

### login-succ.ejs
This is the page that the user sees when they login to their account. There are options to build a new semester schedule, view account history, view account details, or logout of the account.

### ratings.ejs
This is the page that the user sees when they build a new semester schedule. On it is displayed the rating and difficulty of that semester. From this page they can return to the home page.

### update.ejs
This is the page to let the user update their account info. They are told that their account information has been updated and they are directed to the home page.