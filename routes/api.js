const express = require('express');
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const MongoClient = require('mongodb').MongoClient;
const User = require("../models/user");
const Ticket = require("../models/ticket");
router.use(cors());


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


process.env.SECRET_KEY = 'secret'

router.post('/register', (req, res) => {
    const userData =  new User ({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        middle_name: req.body.middle_name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        token : 1
    })

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + ' Registered' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: users.last_name,
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
            res.send('error: ' + err)
        })
})

router.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

// Auth user
//router.get('/login/:email', (req, res) => {
//	User.find({ email: req.params.email }, function (error, data) {
//		if (error) { console.error(error); }
//		res.send(data)
//	})
//})



// get  Ticket
router.get('/ticket', (req, res) => {
    const details = { station_name: req.body.station_name }
        database.collection('ticket')
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

module.exports = router;