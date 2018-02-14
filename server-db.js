const mongoose = require('mongoose');

// --------------------------------------------------------
/** Set up mongoose and connect to database */
// --------------------------------------------------------
mongoose.Promise = global.Promise;
const connection = mongoose.connect('mongodb://localhost/redditclone', { useMongoClient: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
// mongoose.set('debug', true);

module.exports = connection
