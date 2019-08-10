[![Build Status](https://travis-ci.org/klevamane/Maintenance-tr.svg?branch=feature)](https://travis-ci.org/klevamane/Maintenance-tr) [![Coverage Status](https://coveralls.io/repos/github/klevamane/Maintenance-tr/badge.svg?branch=develop&service=github)](https://coveralls.io/github/klevamane/Maintenance-tr?branch=develop&service=github)
[![Maintainability](https://api.codeclimate.com/v1/badges/1e818cfeb6e60ac2c268/maintainability)](https://codeclimate.com/github/klevamane/Maintenance-tr/maintainability)


# Maintenance Tracker(API)
Maintenance Tracker App is an application that provides users with the ability to reach out to
operations or repairs department regarding repair or maintenance requests and monitor the
status of their request.

# Getting Started

## Prerequisite
1. Internet connection
2. Internet browser
3. Nodejs
4. git

## Template URL
* https://klevamane.github.io/Maintenance-tr/UI/Index.html

## Api URL
* https://maintenancetr.herokuapp.com

## Api Documentation
* https://maintenancetr.herokuapp.com/api-docs/#

## User Access
Admin user
- email: admin@gmx.com
- password: Password123 (note that the password is case sensitive)

## How to get a local copy
#### Clone repository
* Copy repository link
* Create a folder location in your computer eg my/path/
* cd my/path/
* git clone repositorylink.git
* cd maintenance-tr
* npm install
* npm run dev
* open index.html file
* Sign-in with any dummy email id and passowrd

## Routes

* PUT https://maintenancetr.herokuapp.com/api/v1/users/requests/:requestId - Modify a user request
* GET https://maintenancetr.herokuapp.com/api/v1/users/requests - List all user requests
* GET https://maintenancetr.herokuapp.com/api/v1/requests - List all users requests
* GET https://maintenancetr.herokuapp.com/api/v1/users/requests/:requestid - List a user request by Id
* PUT https://maintenancetr.herokuapp.com/api/v1/requests/:requestId/approve - Approve a user request
* PUT https://maintenancetr.herokuapp.com/api/v1/requests/:requestId/disapprove - Disapprove a user request
* PUT https://maintenancetr.herokuapp.com/api/v1/requests/:requestId/resolve - Resolve a user request
* POST https://maintenancetr.herokuapp.com/api/v1/auth/signup - Register a new user
* POST https://maintenancetr.herokuapp.com/api/v1/auth/login - Authenticate registered user
* POST https://maintenancetr.herokuapp.com/api/v1/users/requests -Create a user request


## Branches
The branches are structured in a way that they correspond to feature developed in the application. for example the with name a ft-login-xxxx corresponds codes for the log in page and ft-signup-xxx corresponds to codes for the signup page, some other branches to update user interface and implement quick fix also exist.
The develop branch is positioned currently as the default branch due to the on-going nature of this project. It is expected that as the project nears completion some branches will be merged and completely deleted

## Testing

Test locally by executing "npm run test-dl"
```
info: Server is running on port 3000
  POST USER /user
POST /api/v1/auth/signup 201 117.828 ms - 63
    ✓ should create a new user (148ms)
POST /api/v1/auth/signup 400 3.144 ms - 52
    ✓ Mobile number should be of nigerian format
POST /api/v1/auth/signup 400 1.553 ms - 48
    ✓ Lastname must contain only alphabets
POST /api/v1/auth/signup 400 0.960 ms - 50
    ✓ You must provide a valid email address
POST /api/v1/auth/signup 400 1.013 ms - 49
    ✓ Firstname must contain only alphabets
    
    
  30 passing (500ms)
  ```

# Built with
1. Html and Css
2. Bootstrap
3. JQuery
4. NodeJS
4. Fetch api

# Contributors
* Onengiye Richard (klevamane)
# Author
* Onengiye Richard (klevamane)

