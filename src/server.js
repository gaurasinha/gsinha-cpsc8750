// use the express library
const express = require('express');

// create a new server application
const app = express();

// Define the port we will listen on
// (it will attempt to read an environment global
// first, that is for when this is used on the real
// world wide web).
const port = process.env.PORT || 3000;

//Import Cookie Parser
const cookieParser = require('cookie-parser');


// Tell the server code about the public folder
app.use(express.static('public'));

app.use(cookieParser());

// set the view engine to ejs
app.set('view engine', 'ejs');

let nextVisitorId = 1;
// The main page of our website
app.get('/', (req, res) => {
  res.cookie('visited', Date.now().toString());
  let vid
  if(req.cookies.visitorId){
    vid = req.cookies.visitorId
  }
  else{
    vid = ++nextVisitorId;
    res.cookie('visitorId',vid);
  }

  let diff
  if(req.cookies.visited){
    diff = (Math.round((Date.now()-req.cookies.visited)/1000)).toString();
  }
  else{
    diff = null;
  }
  res.render('welcome', {
    name: req.query.name || "World",
    visitorId: vid,
    diff: diff

  });
  
  let cookieValue = req.cookieParser();

});


// Start listening for network connections
app.listen(port);



// Printout for readability
console.log("Server Started!");