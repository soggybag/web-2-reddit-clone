const controllers = require('./controller-auth');

// --------------------------------------------------------
/**
 * Auth routes - Sign up, Login, Logout
 */
// --------------------------------------------------------

module.exports = (app) => {
  /** Logout - */
  app.get('/logout', controllers.logout);
  /** Login - show login form */
  app.get('/login', controllers.getLogin);
  /** Login - Submit handle log in */
  app.post('/login', controllers.postLogin);
  /** Sign up - Show sign-up form */
  app.get('/sign-up', controllers.getSignUp);
  /** Sign up - Handle Sign up */
  app.post('/sign-up', controllers.postSignUp);
};
