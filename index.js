var express = require('express');
var app = express();
var cors = require ('cors');
var dal = require('./dal.js');

// used to serve static files
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function(req, res){
    // else create user (before)
    //res.send({
    //    name: req.params.name,
    //    email:  req.params.email,
    //    password: req.params.password
    //});
    // else create user (now)
    dal.create(req.params.name,req.params.email,req.params.password).then((user) => {
            console.log(user);
            res.send(user);
        });
});

// user login
app.get('/account/login/:email', function(req, res){
    // res.send({
    //     email:  req.params.email,
    //     password: req.params.password
    // });
    //NOW
    dal.find(req.params.email).then((user) => {
        console.log(user);
        res.send(user);
    });
});

// user deposit
app.get('/account/deposit/:email/:deposit', function(req, res){
    // res.send({
    //     email:  req.params.email,
    //     deposit: parseInt(req.params.deposit),
    //     balance: parseInt(req.params.balance)
    // });
    //NOW
    dal.update(req.params.email,parseInt(req.params.deposit)).then((user) => {
        console.log(user);
        res.send(user);
    });
});

// user withdraw
app.get('/account/withdraw/:email/:withdraw', function(req, res){
    // res.send({
    //     email:  req.params.email,
    //     withdraw: parseInt(req.params.withdraw),
    //     balance: parseInt(req.params.balance)
    // });
    //NOW
    dal.update(req.params.email,parseInt(req.params.withdraw)*-1).then((user) => {
        console.log(user);
        res.send(user);
    });
});

// user balance
app.get('/account/balance/:email', function(req, res){
    // res.send({
    //     email:  req.params.email,
    //     balance: parseInt(req.params.balance)
    // });
    //NOW
    dal.find(req.params.email).then((user) => {
        console.log(user);
        res.send(user);
    });
});

// all account
app.get('/account/all', function(req, res){
    //before
    //res.send({
    //    name:   'peter',
    //    email:  'peter@mit.edu',
    //    password: 'secret'
    //});
    //now
    dal.all().then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

// USER LOGIN
// app.get('/account/login/:email/:login', function(req, res){
//     // res.send({
//     //     email:  req.params.email,
//     //     login: req.params.login,
//     // });
//     //NOW
//     dal.updateLogin(req.params.email,req.params.login).
//     then((user) => {
//         console.log(user);
//         res.send(user);
//     });
// });

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);
