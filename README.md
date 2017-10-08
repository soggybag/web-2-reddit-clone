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

