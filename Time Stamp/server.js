// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(cors())
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
//app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/",function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));
})
app.get("/:dateVal", function (request, response) {
  
  var DateValue = request.params.dateVal;
  var options = {  
    year: "numeric", month: "short",  
    day: "numeric"
};
  
  if(isNaN(DateValue)){
    var dateNow = new Date(DateValue);
    var unix =dateNow.getTime()/1000;
    var n = dateNow.toLocaleDateString("en-us", options);
  }
  else{
    var unix = DateValue*1000;
    var natural = new Date(unix);
    var n = natural.toLocaleDateString("en-us", options);
  }
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({"unix":unix,"natural":n}))
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
