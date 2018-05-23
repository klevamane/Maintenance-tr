[![Build Status](https://travis-ci.org/klevamane/Maintenance-tr.svg?branch=feature)](https://travis-ci.org/klevamane/Maintenance-tr) [![Coverage Status](https://coveralls.io/repos/github/klevamane/Maintenance-tr/badge.svg?branch=feature)](https://coveralls.io/github/klevamane/Maintenance-tr?branch=feature) [![Maintainability](https://api.codeclimate.com/v1/badges/1e818cfeb6e60ac2c268/maintainability)](https://codeclimate.com/github/klevamane/Maintenance-tr/maintainability)



# Maintenance Tracker
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

* GET http://localhost:3000/api/v1/users/requests - List all user requests
* GET http://localhost:3000/api/v1/users/requests/:requestid - List a user request by Id
* DELETE http://localhost:3000/api/v1/businesses/:id - Deletes a user request
* POST http://localhost:3000/api/v1/auth/signup - Register a new user
* POST http://localhost:3000/api/v1/auth/login - Authenticate registered user

## Branches
The branches are structured in a way that they correspond to feature developed in the application. for example the with name a ft-login-xxxx corresponds codes for the log in page and ft-signup-xxx corresponds to codes for the signup page, some other branches to update user interface and implement quick fix also exist.
The develop branch is positioned currently as the default branch due to the on-going nature of this project. It is expected that as the project nears completion some branches will be merged and completely deleted


# Built with
1. Html and Css
2. Bootstrap
3. JQuery

# Contributors
* Onengiye Richard (klevamane)
# Author
* Onengiye Richard (klevamane)

