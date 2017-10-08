# web-2-reddit-clone

This is clone of a Reddit built with Node and Express JS. This was buit following the tutorial 
[here](https://www.makeschool.com/online-courses/tutorials/reddit-clone-in-node-js/technical-planning). 

## Notes

### UI State 

To handle changes in the interface I used class names attached to the body tag. These handle things like
showing and hiding login and signup, and showing the current menu item. 

For example the following applies styles when the body has the class home: 

> public/styles.css

```
body.home nav ul li.home { border-bottom: 1px solid #f0f; }
body.home li.home > a { color: #f0f; }
```

I attached class in each route by adding class names to the `bodyClass` property which is passed to 
the template. 

This was not as DRY as could be, probably could be refactored in the future. 
Here the home route adds the class `home` and also adds the class `loggedin` when the a user is logged in. 

> controllers/posts.js

```app.get('/', (req, res) => {
  const currentUser = req.user; // Get a user
  let message = "";
  let loggedin = ""; 
  if (currentUser !== null) {
    message = `Welcome back ${currentUser.username}`;
    loggedin = "loggedin"; // If logged in add this
  }
  res.render('home.hbs', {
    bodyClass: `home ${loggedin}`, // Add these to the body class. 
    pageTitle: "Home",
    currentUser,
    message: message
  });
});
```

The Main Template uses: 

> views/layouts/main.hbs

```
...
<body class={{bodyClass}}>
...
```

### Voting

Voting is handled via AJAX by calling a route via JavaScript. 

- Be sure to import jQuery to handle sending AJAX messages. I included jQuery in the `views/layouts.main.hbs`

At the moment voting is calculated by keeping an array of up votes and down votes. When a user up votes a post
their user id is added to the `upVotes` array and removed from the `downVotes` array on that post object. 
The vote score is calculated by subtracting the count of down votes from the up votes. 

This means once you have voted you can't be neutral! You have a vote in either up or down. Ideally if you had 
up voted a post and then down voted your up vote would be removed and not down vote would be added. 

### Comments

Posts store comment objects in a `comments` array. 

Comments also store comments in a `comments` array. For this to work I needed to find the existing nested comment. 
This happens here: 

> controllers/replies.js

`app.post('/posts/:postId/comments/:commentId/replies', (req, res, next) => {`

This route takes in a post id and a comment id. It needs to find a comment by id which can be deeply nested in 
the post's comment array. 

_I wrote a recursive function to do this. There must be a better way._

After finding the comment that is being replied to we need to create a new comment and add it to that comment's 
`comments` array. 

**It was import to make the post as modified to make sure Mongoose saved the deeply nested documents**

> controllers/posts.js

`post.markModified('comments');`

### Authorization

Many actions require a user to be logged in e.g. creating a new post, creating a comment, voting. I handeled this
in two ways. First by using a class name on the body tag to control the display of the UI e.g. showing and hiding
the login and sign up links. Or inside a route to prevent creating of posts when no logged in. 

For UI handling see the section above [UI State](#UIState)

In routes I generally handled this by checking the user token on the request and redirecting to the login route.

```
const currentUser = req.user;   // get the current user
let loggedin = "";
if (currentUser === null) {     // if the user is null 
  return res.redirect('/login');// redirect to '/login'
} else {
  loggedin = "loggedin";
}
```
    
## TODO

- Fix up and down votes to handle removing a previous up or down vote before adding a vote. 
- Show vote status for posts. Up vote would highlight up vote button. Could be handled with a class!
- Show vote score in post template. 
- Improve search for nested comment id when adding replies. 

