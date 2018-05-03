# Review Site jQuery

This is an simple generic review site to test and implement some of the jQuery Ajax features to submit and load data from an Rails API.

### System dependencies
  - Postgres to manage and store data
  - jQuery to handle Ajax requests and DOM manipulation
  - Dotenv to store environment keys
  - Omniauth to authenticate third-party users
  - Bootstrap to style the page 

### Configuration
Change the current working directory to the location where you want the cloned directory to be made and then type:
```
git clone https://github.com/scarsam/review-site.git
```
Once you have cloned all the files type:
```
bundle install
```
to install all the project dependencies and follow the database steps below in order to get the application up and running. To start your server type `rails s` in your terminal but make sure you finish the database creation steps first.
  
### Database initialization and creation
In order to run the application correctly you first need to seed the database with data from the API, run:
```
rake db:create
rake db:migrate
rake db:seed
```

### Contribute to Review Site jQuery
A contributor can be anyone! It could be you. Continue reading this section if
you wish to get involved and contribute back to the Review Site jQuery project.
- Ensure the bug was not already reported by searching on GitHub under Issues.
- If you're unable to find an open issue addressing the problem, open a new one. Be sure to include a title and clear description, as much relevant information as possible, and a code sample or an executable test case demonstrating the expected behavior that is not occurring.

Thanks! :heart: