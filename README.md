## Development History
### v0.1
- [x] Initialize npm project
- [x] Setup express, ejs & body-parser
- [x] Create landing view
- [x] Add campgrounds view
- [x] Add new campground view
- [x] Create header and footer partials
- [x] Import Bootstrap (4.3.1)
- [x] Add nav bar to all page
- [x] Style the campground view
- [x] Style the add new campground view

### v0.2
- [x] Connect to MongoDB Atlas
- [x] Setup Campground model
- [x] Use compground model in existing routes

### v0.3
- [x] Restful
- [x] Re-define schema, add description
- [x] Add view details button on index view
- [x] Add campground details view

### v0.4
- [x] Refactor app.js, seperate the mongoose models
- [x] Setup Comment model 

### v0.5
- [x] create a seed script to populate data into database

### v0.6
- [x] Update show view to display user's comment 
- [x] Add campgrouds views folder and comments views folder
- [x] Add NEW route for creating new comment
- [x] Add new view for submitting new comment
- [x] Add CREATE route for comment
- [x] Add add new comment button
- [x] Style show campground view

### v0.7
- [x] Add authentication related dependencies
- [x] Define User model
- [x] Configure passport
- [x] Add register view
- [x] Add register route
- [x] Add login view
- [x] Add login route
- [x] Add logout route
- [x] Prevent user from adding a comment if not signed in
- [x] Add auth links to navbar
- [x] Show/hide nav links according to user login status

### v0.7.5
- [x] Refactoring Routes, seperate index routes
- [x] Refactoring Routes, seperate campground routes
- [x] Refactoring Routes, seperate comment routes

### v0.7.8
- [x] Associate users and comments
- [x] Save author's name when a comment is created
- [x] Diaplay author's name in campground show view

### v0.7.9
- [x] Modify campground schema to include author info
- [x] Prevent an unauthenticated user from creating a campground
- [x] Save user's informtion to newly created campground
- [x] Display user's name on campground show view

### v0.8.0
- [x] add edit button to campground show page
- [x] add edit route for campgrounds
- [x] add campground edit view
- [x] add update route for campgrounds

### v0.8.2
- [x] add delete button to campground show page
- [x] add destroy route for campgrounds

### v0.8.3
- [x] fix the bug that when a campground is deleted, its associated comments are not removed

### v0.8.5
- [x] add authorization feature so that user can only edit/delete the campgrounds he/she created 
- [x] hide/show edit and delete button according to user's ownership

### v0.9.0
- [x] add edit button to comment
- [x] add edit route for comments
- [x] add comment edit view
- [x] add update route for comments

### v0.9.2
- [x] add delete button to comment
- [x] add destroy route for comments

### v0.9.5
- [x] add authorization feature so that user can only edit/delete the comments he/she created
- [x] hide/show edit and delete button according to user's ownership

### v0.10.0
- [x] refactor authentication and authorization middlewares

### v0.10.1
- [x] fixed the bug where when a comment is deleted, its refernce is not removed in the campground document

### v0.11.0
- [x] install and configure connect-flash
- [x] include flash message in header template

### v0.11.1
- [x] add error message for login required operations
- [x] add error message for unauthorized campground operations
- [x] add error message for unauthorized comment operations

### v0.11.2
- [x] add success/error messages based on login result
- [x] add sucess message when a user logs out
- [x] add signup error message

### v0.12.0
- [x] style landing page
- [x] add slideshow animation

### v0.12.5
- [x] style login page
- [x] style signup page

### v0.12.6
- [x] add sucess message for signup

### v0.12.7
- [x] untrack node_modules folder

### v1.0.0
- [x] add start script
- [x] deploy web application to heroku

### v1.0.1
- [x] change port number to environment variable

### todos
- [ ] add price information in campground schema
- [ ] show relative time in comments
- [ ] improve mobile experience
- [ ] better error handling
- [ ] add location information
- [ ] redesign show page

## Description
Follows RESTful API