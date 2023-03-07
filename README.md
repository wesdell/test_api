# API

## About the project:

This is my first API that you can test with to practice data fetching. You can find the different endpoints that you can consume below.

![API preview](https://i.imgur.com/gMD1umo.png)

## How to use:

You have to take into account _remembering the username and password created or using sign-in with Google._ You do not stress about password security. _We use a hash and a salt to maintain data security._

### JSON

```
JSON: { 
        name: String required,
        email: String required,
        password: String required,
        // choose just one role: 'ADMIN_ROLE' || 'USER_ROLE'
        // ADMIN_ROLE has privileges
        role: String required,
        img: String,
      }
```

### Endpoints

- To get all the users:
```
GET: https://testapi-production-00ce.up.railway.app/api/users
```

- To create new users, considering this endpoint and the previous JSON:
```
POST: https://testapi-production-00ce.up.railway.app/api/users
```

- To update a user depending on the id, considering the next:
```
PUT: https://testapi-production-00ce.up.railway.app/api/users/*HERE-MONGO-ID*
```

_You just can update the following fields: {name, img, role}._

## Generate JWT

- To generate your own JWT following the next:
```
POST: https://testapi-production-00ce.up.railway.app/api/auth/login
```

```
JSON: { 
        email: String required,
        password: String required,
      }
```

- To delete a user depending on the id, considering the next:
```
DELETE: https://testapi-production-00ce.up.railway.app/api/users/*HERE-MONGO-ID*
```

```
Headers: { 
        key-token-jwt: *HERE JWT THAT YOU GENERATED*
      }
```

## Common functionalities:

- The user can sign up with any account, including Gmail
- The user can generate JWT to make specific operations with the data
- The user can update and delete their account

## Build with:

- NodeJS
- MongoDB
- Mongoose

## Key concepts:

- Sing In
- JWT
- API REST
- No-SQL
- Fetching