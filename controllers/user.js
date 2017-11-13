const User = require('../models/user');

module.exports = (app) => {
  app.get('/user/:username', (req, res) => {
    const username = req.params.username;
    User.findOne({ username }).then((user) => {
      console.log(user);
      res.render('profile', {
        ...req.user,
        bodyClass: "profile",
        pageTitle: "User Profile",
        user
      });
    });
  });
};
