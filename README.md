# web-2-reddit-clone

This is clone of a Reddit built with Node and Express JS. This was built following the tutorial 
[here](https://www.makeschool.com/online-courses/tutorials/reddit-clone-in-node-js/technical-planning). 

In general this creates a simple blog or form with categories, comments and voting. 

## Notes

While I followed the tutorial this project does a few things differently. Below are some notes describing my 
approaches to various problems that needed to be solved. 

### UI State 

I chose to handle changes in the User Interface with CSS. I used class names attached to the body to identify 
the satte of the UI. Using classes like `loggedin` and `home` allows the UI to identify whether the user is 
logged in and the current page is the home page. CSS rules haide and show UI elements based on classes 
assigned to the body tag. 

An example rule might look like: 

```
// public/styles.css
body.home nav ul li.home { border-bottom: 1px solid #f0f; }
body.home li.home > a { color: #f0f; }
```

I pass class names to templates in each route through a `bodyClass` property. 

Here the home route adds the class `home` and also adds the class `loggedin` when the a user is logged in. 

```
// controllers/posts.js
app.get('/', (req, res) => {
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

```
// views/layouts/main.hbs
...
<body class={{bodyClass}}>
...
```

This was not as DRY as could be, and probably could be refactored in the future. 

### Models 

The project uses three models 

- Post
- Comment
- User

#### Post

Posts are defined with title, content, created dates, along with properties to handle votes and keep track of 
the author. 

**Comments** holds an array of comments. Comments are stored as _documents_ rather than reference. This seems to 
work well and avoids diffcult look ups for deeply nested references. 

#### Comment 

A Comment can be stored by a post or another Comment. Each Comment has a comments property
that holds other comments as documents. This allows comments to be deeply nested. 

#### User 

A User holds basic information about a user including name and password. 

### Voting

Voting is handled via AJAX by calling a route via JavaScript/jQuery. 

- Be sure to import jQuery to handle sending AJAX messages. I included jQuery in the `views/layouts.main.hbs`

At the moment voting is calculated by keeping an array of **up** votes and **down** votes. Each post model
defines an `upVotes`, `downVotes`, and `voteScore` property. When a user up or down votes a post
their user id is added to the `upVotes` array and removed from the `downVotes` array on that post object. 
The vote score is calculated by subtracting the count of down votes from the up votes. 

This means once you have voted you can't be neutral! You have a vote in either up or down. Ideally if you had 
up voted a post and then down voted your up vote would be removed and not down vote would be added. Fixing this
is in the todos below as a future addition. 

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

