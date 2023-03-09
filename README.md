# TEST API

## About the project:

This is my first API that you can TEST with to practice data fetching. You can find the different endpoints that you can consume below.

![API preview](https://i.imgur.com/gMD1umo.png)

## How to use:

You have to take into account _remembering the username and password created or using sign-in with Google._ You do not stress about password security. _We use a hash and a salt to maintain DATA SECURITY._

## Endpoints

---

### 1. Users

#### To GET all the users:

```
GET: https://testapi-production-00ce.up.railway.app/api/users
```

#### To paginate your results use this QUERY STRINGS:

- Prev = 0 (default)
- Next = 5 (default)

```
GET: https://testapi-production-00ce.up.railway.app/api/users?prev=0&next=5
```

#### To POST new users, considering this JSON:

```
POST: https://testapi-production-00ce.up.railway.app/api/users
```

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

#### POST new user using Google Sign-In:

- Just click on Sign In, choose your account, and then review your BROWSER CONSOLE to get your own JWT, sorry to put that there. :)

#### To PUT a user depending on the id, considering the next:

```
PUT: https://testapi-production-00ce.up.railway.app/api/users/*HERE-MONGO-ID*
```

- You just can update the following fields:

```
JSON: {
        name: String required,
        // choose just one role: 'ADMIN_ROLE' || 'USER_ROLE'
        // ADMIN_ROLE has privileges
        role: String required,
        img: String,
      }
```

#### To DELETE a user depending on the id, considering the next:

##### ADMIN_ROLE is the UNIQUE role who can DELETE ;)

```
DELETE: https://testapi-production-00ce.up.railway.app/api/users/*HERE-MONGO-ID*
```

```
Headers: {
        key-token-jwt: *HERE JWT THAT YOU GENERATED*
      }
```

---

### 2. Authentication and Authorization

#### To GENERATE your own JWT following the next:

```
POST: https://testapi-production-00ce.up.railway.app/api/auth/login
```

```
JSON: {
        email: String required,
        password: String required,
      }
```

---

### 3. Categories

#### To GET all the categories:

```
GET: https://testapi-production-00ce.up.railway.app/api/categories
```

#### To GET a category depending on the id:

```
GET: https://testapi-production-00ce.up.railway.app/api/categories/*HERE-MONGO-ID*
```

#### To paginate your results use this QUERY STRINGS:

- Prev = 0 (default)
- Next = 5 (default)

```
GET: https://testapi-production-00ce.up.railway.app/api/categories?prev=0&next=5
```

#### To POST new categories, considering this JSON:

```
POST: https://testapi-production-00ce.up.railway.app/api/categories
```

```
JSON: {
        name: String required,
      }
```

```
Headers: {
        key-token-jwt: *HERE JWT THAT YOU GENERATED*
      }
```

#### To PUT a category depending on the id, considering the next:

```
PUT: https://testapi-production-00ce.up.railway.app/api/categories/*HERE-MONGO-ID*
```

```
Headers: {
        key-token-jwt: *HERE JWT THAT YOU GENERATED*
      }
```

- You just can update the following fields:

```
JSON: {
        name: String required,
      }
```

#### To DELETE a category depending on the id, considering the next:

##### ADMIN_ROLE is the UNIQUE role who can DELETE ;)

```
DELETE: https://testapi-production-00ce.up.railway.app/api/categories/*HERE-MONGO-ID*
```

```
Headers: {
        key-token-jwt: *HERE JWT THAT YOU GENERATED*
      }
```

---

### 4. Products

#### To GET all the products:

```
GET: https://testapi-production-00ce.up.railway.app/api/products
```

#### To GET a product depending on the id:

```
GET: https://testapi-production-00ce.up.railway.app/api/products/*HERE-MONGO-ID*
```

#### To paginate your results use this QUERY STRINGS:

- Prev = 0 (default)
- Next = 5 (default)

```
GET: https://testapi-production-00ce.up.railway.app/api/products?prev=0&next=5
```

#### To POST new products, considering this JSON:

```
POST: https://testapi-production-00ce.up.railway.app/api/products
```

```
JSON: {
        name: String required,
        category: ObjectId required
        price: Number,
        description: String,
        available: Boolean,
      }
```

```
Headers: {
        key-token-jwt: *HERE JWT THAT YOU GENERATED*
      }
```

#### To PUT a product depending on the id, considering the next:

```
PUT: https://testapi-production-00ce.up.railway.app/api/products/*HERE-MONGO-ID*
```

```
Headers: {
        key-token-jwt: *HERE JWT THAT YOU GENERATED*
      }
```

- You just can update the following fields:

```
JSON: {
        name: String required,
        price: Number,
        description: String,
        available: Boolean,
      }
```

#### To DELETE a product depending on the id, considering the next:

##### ADMIN_ROLE is the UNIQUE role who can DELETE ;)

```
DELETE: https://testapi-production-00ce.up.railway.app/api/products/*HERE-MONGO-ID*
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
- The user can create, update, and delete categories and products

## Build with:

- NodeJS
- MongoDB
- Mongoose

## Key concepts:

- JWT
- Auth
- Sing In
- API REST
- No-SQL
- Fetching
