const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const MongoClient = require('mongodb').MongoClient;
const User = require("../models/User");
const Ticket = require("../models/ticket");
router.use(cors());

process.env.SECRET_KEY = 'secret';

// Connect
const CONNECTION_URL = "mongodb+srv://admin:admin@busstation-ygwnh.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "busstation";

var database, collection;

    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("user");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

//REGISTER
router.post('/register', (req,res) => {
    //const today = new Date()
    //const userData = 
    const new_user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        middle_name: req.body.middle_name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        token: 1
    })
    new_user.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
    })
})


//LOGIN
router.post('/login', (req,res) => {
    
    User.findOne ({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
    .then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    middle_name: user.middle_name,
                    email: user.email,
                    phone: user.phone
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
            } else {
                res.json({ error: "User does not exist" })
            }
        } else {
            res.json({ error: "User does not exist" })
        }
    })
    .catch(err => {
        res.send('error: ' + err);
    })
})

// get  Ticket
router.post('/ticket', (req, res) => {
    const details = { station_name: req.body.station_name }
    connection((db) => {
        db.collection('ticket')
            .find(details)
            .toArray()
            .then((all) => {
                response.data = all;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });



	//Ticket.find({}, function (error, data) {
	//	if (error) { console.error(error); }
	//	res.send(data)
//	})
})



//PROFILE
router.get('/profile', (req,res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        where: {
            _id: decoded._id
        }
    })
    .then(user => {
        if(user) {
            res.json(user);
        }else{
            res.send('User does not exist');
        }
    })
    .catch(err => {
        res.send('error: ' + err);
    })
})


module.exports = router;