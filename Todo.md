
# Little Debbie's Collector Club
## MVP

- [ ] Display the full value of each property on the details page (not the id). 
> *Hint: Use one of json-servers relationship features.*
***
- [] Anyone visiting the site needs to be able to log in.
***
- [] Only one admin.  Everyone else will not be an admin.  This needs to be reflected in the data.
> Hint: you will need to add `isAdmin: false` to the register user object.* 
***
- [] Make a list of toppings stored in the database; there should be some way to mix and match the toppings with the snacks.

    - [] Each `snack` should be able to have multiple `toppings`, (or no toppings at all).

    - [] Each `topping` should be able to go on multiple `snacks`, (or no snacks at all).

> Hint: What type of relationship will this be?
>
> What tables will need to be created in the database?
>
> **Be sure to share your ERD with the instruction team.**
***
- [] The snack detail will need to display all the toppings for the one snack. Make this a comma separated list in a paragraph.
***
- [] Display snacks with particular toppings.

- [] The dropdown menu should read from the toppings list in the DB and be displayed in the navbar.

- [] The dropdown list of **toppings** should trigger a call to DB for **only** those snacks with toppings and then **display** them.
    - Something like, show me all snacks with chocolate icing.  Only those snacks will be displayed.
***
- [] Make it possible to add a **new snack type** to the `type` table in the DB.

- [] Add **Oatmeal Creme Pie Cereal** to the list of snacks in the DB. 

- [] Make an object that includes **properties** of the snack table in the ERD and **post** it to the DB with **Postman**.
***
- [] Only display the `Add Type` if an **admin** is logged in.
***
### ERD
**Before you begin any code**, use the ERD script and paste it into DBDiagram. Complete the relationships based on the MVP requirements. Share with the instruction team to get an updated `snacks.json` file.

### Bonus
1. Add the functionality to add and edit a Topping - but only for admin users.
1. Add the functionality to add and edit a snack - but only for admin users. This one is tricky since there is an option to have multiple toppings.
1. Add the functionality to edit a snack - but only for admin users. 

### Notes
1. Ask questions about the requirements to ensure you are meeting expectations.
1. After you complete each feature add, commit, push, and merge to github.
1. Share your progress with the instruction team.

## To run this project
1. run `json-server` in the API directory.
```
json-server -p 8088 -w snacks.json
```
1. `serve` the index.html on your local machine.
