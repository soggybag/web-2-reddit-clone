// --------------------------------------------------------
/** Load environment validationResult */
// --------------------------------------------------------
require('dotenv').config(); // npm install --save dotenv

// --------------------------------------------------------
/** Import dependancies */
// --------------------------------------------------------
const jwt = require('jsonwebtoken');                  // *** use json web token
const express = require('express');
const exphbs = require('express-handlebars');         // Import express handlebar                 // Run: $ mongod
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');        // *** Use cookie parser
const expressValidator = require('express-validator');

const serverDb = require('./server-db')


// --------------------------------------------------------
/** Start Express */
// --------------------------------------------------------
const app = express();

// Check the environment
const isDevelopment  = app.get('env') !== "production";

// --------------------------------------------------------
/** Setup middleware */
// --------------------------------------------------------
app.use(cookieParser()); // *** set up cookie parser as middleware.

// Set up a static directory
app.use(express.static('public'));

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // Add after Body parser!

// Auth middleware
const checkauth = (req, res, next) => {
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload; // {  _id, username }
  }
  next();
}
app.use(checkauth);

// --------------------------------------------------------
/** Set templating with handlebars */
// --------------------------------------------------------

// Use this as a helper function
const getCurrentYear = () => {
  return new Date().getFullYear();
};

const formatDate = (d) => {
  const date = new Date(d);
  return date == "Invalid Date" ? new Date().toDateString() : date.toDateString();
};

// Set up Handlebars with express
app.engine('.hbs', exphbs({
  extname: '.hbs',                  // Set the file extension
  defaultLayout: 'main',            // Set a default template
  helpers: {                        // Define some helper functions
    formatDate,
    getCurrentYear  // This function returns the current year
  }
}));

// Set the view engine and file extension
app.set('view engine', '.hbs');



// --------------------------------------------------------
/** Define routes */
// --------------------------------------------------------
// Set post routes
require('./controllers/posts')(app);
require('./controllers/comments')(app);
require('./controllers/auth')(app);
require('./controllers/user')(app);
require('./controllers/replies')(app);

require('./controllers/posts-api')(app);

// --------------------------------------------------------
/** Start the app */
// --------------------------------------------------------
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

const DEFAULT_PORT = 3000;

app.set("port", process.env.PORT || DEFAULT_PORT);

if (!module.parent) {
  app.listen(app.get("port"), () => {
    console.log('Server is running on port 3000');
  });
}


module.exports = app; // Export app
