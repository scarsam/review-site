## Reviews site

#### Overview
- Nav
  - Reviews
  - Post a review
  - Login / Sign up
    - Omniauth (Google / Facebook)
  
- Index page for all reviews
  - List all reviews
  - Click to load more..
  - Concatenated + author
  
- Show page for a review
  - Image
  - Rating
  - Description
  - Author
  - Next / Previous review

- A user has many reviews
  - List all review for the user
  
- A user can create a review
  - Title
  - Description
  - Rating
  - Image

- Reviews prototype methods
  - Order?
  - Format the review?
  
#### DB Tables
- Reviews
  - Image
  - Rating
  - Title
  - Description
  - Author
  
- Author
  - Name
  - Email
  - Image
  - uID
  
### Models
- Reviews
- Author
- Session

### Gems
- Omniauth
- Paperclip?
- Dotenv
- Bootstrap


### TODO
- Delete an item created by yourself
- Click on author to display author reviews
- Display login if currently not logged in instead of form
- Log out link

V2
- Validation
- Rating (stars?)
- Tests


### Questions
- Common design patterns?
- Testing?
- Why not just store objects in an "store" and reference them instead of making calls to the server all the time?
- Better way than empty() all the time?
- Truncate, rails helper in html?