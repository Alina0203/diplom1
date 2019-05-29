const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require("cors");
const path = require('path'); 
const http = require('http'); 
const app = express(); 
const mongoose = require('mongoose');


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


/*const mongoURI = 'mongodb://localhost:27017/busstation';

mongoose
  .connect(mongoURI, {useNewUrlParser: true})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
*/

var Users = require ('./routes/Users');

app.use('/users', Users)

app.listen(port, function(){
  console.log('Server started on ' + port);
});

