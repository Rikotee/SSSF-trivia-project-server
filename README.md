# Trivia API

This is the GraphQL API used in Web frontend for application called Trivia.
This README will only cover the topics relevant to the backend such as:

* General info
* Getting started and deployment
* Setting MongoDB database
* Example query

## General info

The main purpose of this backend is to store users best scores in the game. 
In addition to that this API is also responsible for registering and logging in users and doing the authentication required to make the requests.

## Getting started and deployment

* Clone the repository and run npm i in order to install the required packages.
* cd to cloned repository.

create .env
```
DB_URL=mongodb://your-username:your-password@server-address/trivia
```

start server

```
nodemon
```

## MongoDB database

```
use trivia
```

create user
```
db.createUser({user: "your-username", pwd: "your-password", roles: [ { role: "readWrite", db: "trivia" }]})
```

## Query

### Example login query
![This is an login query image](https://users.metropolia.fi/~teemutr/queryimg/login.png)

### Example register query
![This is an register query image](https://users.metropolia.fi/~teemutr/queryimg/register.png)

All these below require a bearer token (JWT) to be sent in the "Authorization" header.

### Example users query
![This is an users query image](https://users.metropolia.fi/~teemutr/queryimg/users.png)

### Example user query
![This is an user query image](https://users.metropolia.fi/~teemutr/queryimg/user.png)

### Example modify highscore query
![This is an modify highscore query image](https://users.metropolia.fi/~teemutr/queryimg/modifyhs.png)

