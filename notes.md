# Reddit Clone - Notes

## Making the Reddit api

This section will look at building an API into the Reddit Project that
delivers JSON.

### Designing the API

Creating a well planned API will make all of your other work easier. While
you aren't writing code at this step you are planning the code you will write
and this is what makes this step important!

Design your routes. The route itself should describe what the action is, what
is returned, and what parameters are expected.

What does the API need to support? The API you write needs to:

- Return all posts
- Return all posts in a reddit/category
- Return a single post
- Create a new post
- Vote a post up
- Vote a post down
- Comment to post
- Reply to comment
- Login
- Logout
- Signup

**Challenge**

Write your API. Include the following:

- Route - The route: /api/posts
- REST verb - A REST verb: POST
- Action - The Action: Gets all posts
- Description - Returns an array of all most recent posts

**Stretch Challenge**

Add routes for the following:

- Return posts in a range starting at an index to an index
- Return posts by user
- Edit post
- Delete post
- Posts count

Take a look at the real Reddit API for inspiration. Keep in mind that this API
much larger than the API you are creating.

- https://www.reddit.com/dev/api/

### Routes

Your routes

| Route                    | REST   | Action | Description                  |
|--------------------------|--------|--------|------------------------------|
| /api/posts               | GET    | Get    | Gets Posts                   |
| /api/posts/:id           | GET    | Get    | Get a single post with an id |
| /api/posts/edit/:id      | PUT    | Update | Edit a post                  |
| /api/posts/delete/:id    | DELETE | Destroy | Delete a post             |
| /api/post/new            | POST   | Create | Create a new post            |
| /api/posts/category/:category     | GET    | Get    | Get posts in category        |
| /api/posts/vote-up/:id   | PUT    | update | Update vote for post id      |
| /api/posts/vote-down/:id | PUT    | update | Update vote for post id      |
| /api/user/:id            | GET    | Get    | Returns a user profile for id |
| /api/login               | POST   | Post   | Login post `username` and `password` |
| /api/logout              | POST   | Post   | Logout                       |
| /api/signup              | POST   | Create | Sing up post `username`, `password`, `email` |
| /api/comment/new         | POST   | Create | Create a new comment on a post post `content`, `postId` |
| /api/comment/reply       | POST   | Create | Create a new reply to a comment `content`, `postId`, `commentId` |

### Create the routes for the api

Write the route handlers for each of the routes you defined.

```JavaScript
// Get Posts
app.get('/api/posts', (req, res) => {

});

// Get single post
app.get('/api/posts/:id', (req, res) => {

});

// Edit post
app.put('/api/posts/edit/:id', (req, res) => {

});

// Delete post
app.delete('/api/posts/delete/:id', (req, res) => {

});

// New post
app.post('/api/posts/new', (req, res) => {

});

// Get Posts in category
app.get('/api/posts/:category', (req, res) => {

});

// Vote Post up
app.put('/api/posts/vote-up/:id', (req, res) => {

});

// Vote Post down
app.put('/api/posts/vote-down/:id', (req, res) => {

});

// Comment new on post
app.post('/api/comment/new', (req, res) => {

});

// Comment new reply
app.post('/api/comment/reply', (req, res) => {

});

// Log in
app.post('/api/login', (req, res) => {

});

// Log out
app.post('/api/logout', (req, res) => {

});

// Sign up
app.post('/api/signup', (req, res) => {

});
```

### Testing Routes

Write tests for each route. Your initial tests should all fail. Your job is to make all of the tests pass.



---

## Testing

The goal of testing is to define software tests that will app will have to
meet. Running the test suite will will check these and provide feedback.

Mocha.js is a testing framework that works with Node.js and Chai.js is a
helper library that supplies utility.

It has been suggested that testing first produces better results than writing
tests after implementation.

### What should you test?

Every feature your app depends on for functionality. If you are counting
on your app to do something you need to test it.

- Database
  - Creating new records
  - Fetching records
  - Updating records
- Processes
  - Logging in
  - Logging out
- Test cases that can fail
  - Login should fail with the wrong user and password


### What is a good test?  



### Test scripts

```
"scripts": {
  "test": "nodemon --exec 'mocha --recursive --timeout 100000'"
},
```






## Authenication

This project uses a token based authenication using jwt (JSON Web Token).

### Tokens

Tokens are implemented roughly as:

1. A user requests access by logging in with a user name and a password.
2. The App validates these credentials.
3. The App returns a signed token to the client.
4. The client stores the token and sends it with each request.
5. The App verifies the token with each request before responding with data.

Tokens are stored on the client side. Tokens are sent with each request.

Tokens expire after a set time period.

Tokens can be revoked by the App.

** Access-Control-Allow-Origin: * **

Cross-origin resource sharing CORS is a mechanism that allows many
resources on a Web page to be requested from another domain outside
the domain the resource originated from. In particular, JavaScript's
AJAX calls can use the XMLHttpRequest mechanism.

The CORS filter should be defined before Authentication / Authorization
filters to make sure the CORS headers will always be sent.



## Models

### Post

- title:      { String }
- content:    { String }
- createdAt:  { Date }
- updatedAt:  { Date }
- category:   { String }
- comments:   [Comment]
- author:     { User }

A post stores comments in an array. These are comments applied directly to the
post itself.

New comments are added to the comments array at index 0 with unshift.

### Comment

- content:    { String }
- createdAt:  { Date }
- updatedAt:  { Date }
- comments:   [this]
- author:     { User }

Comments hold an array of other comments. When a comment is commented it adds a
the new comment to comments which references it's type as self.
