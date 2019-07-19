# 4shers-server

## User Validation 

Fullname  : 
  - Required : **true**
  - Validation Pattern : **Alphabet** & **Space** Only
Username  :
  - Required : **true**
  - Unique : **true**
  - Validation Pattern :
    1. Minimum Length : 6
    2. **Alphabet** and ('.', '_', '-') **Symbols**
Email     :
  - Required : **true**
  - Unique : **true**
  - Validation Pattern : Email Format
Password  :
  - Required : **true**
  - Validation Pattern :
    1. Minimum Length : 8
    2. **AlphaNumeric**


## REST API FOXSHARE

routes used in this API :
### **USER ROUTES**
-------- 
#### Sign Up
````
POST '/users/signup'
````
````
  request :
  - body :
    1. fullname : String,
    2. username : String,
    3. email : String,
    4. password : String
````
````
  response :
  {
    "_id": "5d308afa3a3a4904af8c295b",
    "fullname": "yudawardana",
    "username": "yudawardana",
    "email": "yuda@mail.com",
    "password": "$2a$10$XoLGBDX3DY.nu8BLx2XC0u4VFpa4nZiaQfs.xT/CT1SCtlhOKd2G6",
    "createdAt": "2019-07-18T15:06:34.710Z",
    "updatedAt": "2019-07-18T15:06:34.710Z"
  }
````
#### Sign In
````
POST '/users/signin'
````
````
  request :
  - body :
    1. email :  String,
    2. password : String
````
````
  response : 
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzA4YWZhM2EzYTQ5MDRhZjhjMjk1YiIsInVzZXJuYW1lIjoieXVkYXdhcmRhbmEiLCJlbWFpbCI6Inl1ZGFAbWFpbC5jb20iLCJpYXQiOjE1NjM0NjIzOTd9.f1sf7-s1EoD87yn4kLBBaddcwTkhQEcqsE9TrXFllhA"
  }
````

### **BUCKET ROUTES**
--------
#### Get all public file in database
````
GET '/public'
````
````
  request:
````
````
  response :
  [
    {
        "files": [],
        "_id": "5d30c9fc998dc4382e1112e2",
        "bucketname": "yuda",
        "status": "public",
        "author": "5d308afa3a3a4904af8c295b",
        "createdAt": "2019-07-18T19:35:24.200Z",
        "updatedAt": "2019-07-18T19:35:24.200Z",
        "__v": 0
    }
  ]
````
#### get one public file in database by id
````
GET '/getone/:bucketId'
````
````
request :
  - params : 
      1. bucketId 
````
````
response :
  {
    "files": [],
    "_id": "5d30b93c7e27341d6f792d52",
    "bucketname": "yuda",
    "status": "private",
    "author": "5d308afa3a3a4904af8c295b",
    "createdAt": "2019-07-18T18:23:56.843Z",
    "updatedAt": "2019-07-18T18:53:09.158Z",
    "__v": 0
  }
````
#### get all private file filtered by user id
````
GET '/private'
````
````
  request :
    - headers
      1. token
````
````
  response :
    [
      {
          "files": [],
          "_id": "5d30b93c7e27341d6f792d52",
          "bucketname": "yuda",
          "status": "private",
          "author": "5d308afa3a3a4904af8c295b",
          "createdAt": "2019-07-18T18:23:56.843Z",
          "updatedAt": "2019-07-18T18:53:09.158Z",
          "__v": 0
      }
    ]
````
#### search bucket by name
````
GET '/search'
````
````
  request :
    - query :
      1. ?search={{ user input bucketname }} 
      
````
````
  response :
    [
    {
        "files": [],
        "_id": "5d30b93c7e27341d6f792d52",
        "bucketname": "yuda",
        "status": "private",
        "author": "5d308afa3a3a4904af8c295b",
        "createdAt": "2019-07-18T18:23:56.843Z",
        "updatedAt": "2019-07-18T18:53:09.158Z",
        "__v": 0
    },
    {
        "files": [],
        "_id": "5d30c9fc998dc4382e1112e2",
        "bucketname": "yuda",
        "status": "public",
        "author": "5d308afa3a3a4904af8c295b",
        "createdAt": "2019-07-18T19:35:24.200Z",
        "updatedAt": "2019-07-18T19:35:24.200Z",
        "__v": 0
    }
]
````
#### get all users bucket
````
GET '/useBucket'
````
````
  request :
    -headers : 
      1. token
      
````
````
  response :
    [
    {
        "files": [],
        "_id": "5d30b93c7e27341d6f792d52",
        "bucketname": "yuda",
        "status": "private",
        "author": "5d308afa3a3a4904af8c295b",
        "createdAt": "2019-07-18T18:23:56.843Z",
        "updatedAt": "2019-07-18T18:53:09.158Z",
        "__v": 0
    },
    {
        "files": [],
        "_id": "5d30c9fc998dc4382e1112e2",
        "bucketname": "yuda",
        "status": "public",
        "author": "5d308afa3a3a4904af8c295b",
        "createdAt": "2019-07-18T19:35:24.200Z",
        "updatedAt": "2019-07-18T19:35:24.200Z",
        "__v": 0
    }
]
````
#### make new  bucket
````
POST '/'
````
````
  request: 
    - headers :
      1. token

    -body :
      1. bucketname
      2. status (by default 'public')
````
````
  response : 
  {
    "files": [],
    "_id": "5d30c9fc998dc4382e1112e2",
    "bucketname": "yuda",
    "status": "public",
    "author": "5d308afa3a3a4904af8c295b",
    "createdAt": "2019-07-18T19:35:24.200Z",
    "updatedAt": "2019-07-18T19:35:24.200Z",
    "__v": 0
  }
````
#### update bucket that contain file
````
PATCH '/file/:bucketId'
````
````
  request : 
    - headers : 
      1. token

    - body :
      1. bucket name
      2. status
      3. fileId

    -authorization
````
````
  response : 
  {
    "files": [
        "5d30b8f07e27341d6f792d51"
    ],
    "_id": "5d30b93c7e27341d6f792d52",
    "bucketname": "yuda",
    "status": "private",
    "author": "5d308afa3a3a4904af8c295b",
    "createdAt": "2019-07-18T18:23:56.843Z",
    "updatedAt": "2019-07-18T18:52:44.514Z",
    "__v": 0
  }
````
#### update bucket that not contain file
````
PATCH '/nofile/:bucketId'
````
````
  request : 
    - headers : 
      1. token

    - body :
      1. bucket name
      2. status

    -authorization
````
````
  response : 
  {
    "files": [],
    "_id": "5d30b93c7e27341d6f792d52",
    "bucketname": "yuda",
    "status": "private",
    "author": "5d308afa3a3a4904af8c295b",
    "createdAt": "2019-07-18T18:23:56.843Z",
    "updatedAt": "2019-07-18T18:52:44.514Z",
    "__v": 0
  }
````
#### delete one of bucket in database
````
DELETE '/:bucketId'
````
````
  request : 
    -headers : 
      1. token
    
    -params : 
      1. bucketId
      
    -authorization
````
````
  response : 

  {
    "files": [],
    "_id": "5d30b93c7e27341d6f792d52",
    "bucketname": "yuda",
    "status": "private",
    "author": "5d308afa3a3a4904af8c295b",
    "createdAt": "2019-07-18T18:23:56.843Z",
    "updatedAt": "2019-07-18T18:52:44.514Z",
    "__v": 0
  }
````


### **ITEM ROUTES**
--------
#### search bucket by name
````
GET '/search'
````
````
  request :
    - query :
      1. ?search={{ user input filename }} 
      
````
````
  response :
    [
    {
        "files": [],
        "_id": "5d30b93c7e27341d6f792d52",
        "bucketname": "yuda",
        "status": "private",
        "author": "5d308afa3a3a4904af8c295b",
        "createdAt": "2019-07-18T18:23:56.843Z",
        "updatedAt": "2019-07-18T18:53:09.158Z",
        "__v": 0
    },
    {
        "files": [],
        "_id": "5d30c9fc998dc4382e1112e2",
        "bucketname": "yuda",
        "status": "public",
        "author": "5d308afa3a3a4904af8c295b",
        "createdAt": "2019-07-18T19:35:24.200Z",
        "updatedAt": "2019-07-18T19:35:24.200Z",
        "__v": 0
    }
]
````