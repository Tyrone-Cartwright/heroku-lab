//TODO require our dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

//TODO initialize the express app
const app = express();
//TODO configure server settings
require('dotenv').config();

//TODO Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//TODO establish a connection to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

//TODO Connect to Mongo &
//TODO Fix Depreciation Warnings from Mongoose
//TODO May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TODO connection instance shortcut variable
const db = mongoose.connection;

//TODO Error / Success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

//TODO client connection method
mongoose.connect(MONGODB_URI);

//TODO mount middleware
// use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })); // extend: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project
// use method override
app.use(methodOverride('_method')); // allow POST, PUT and DELETE from a form

//TODO mount our routes
// localhost:3000
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// tell the server to listen for requests from the client
app.listen(PORT, () => {
  console.log(`Express is listening on port: ${PORT}`);
});
