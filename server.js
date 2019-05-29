const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require("cors");
const path = require('path'); 
const http = require('http'); 
const app = express(); 
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));



const uri = "mongodb+srv://admin:<admin>@busstation-ygwnh.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("busstation").collection("user");
  // perform actions on the collection object
  client.close();
});

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

