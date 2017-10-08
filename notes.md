# Reddit Clone - Notes

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
