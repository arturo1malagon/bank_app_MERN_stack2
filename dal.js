// -----------ON LAPTOP----------------

// const MongoClient = require('mongodb').MongoClient;
// const url         = 'mongodb://localhost:27017';
// let db            = null;
 
// // connect to mongo
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
//     console.log("Connected successfully to db server");

//     // connect to myproject database
//     db = client.db('myproject');
// });

//------- ON LAPTOP2 -------

// const MongoClient = require('mongodb').MongoClient;
// const url         = 'mongodb://localhost:27017';
// let db            = null;
 
// // connect to mongo
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
//     console.log("Connected successfully to db server");

//     // connect to myproject database
//     db = client.db('myproject');
// });

//-------- DOCKER ----------
// const { MongoClient } = require("mongodb");
// const url         = 'mongodb://localhost:27017';
// var _db;
 
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
//     console.log("Connected successfully to db server");
//     // connect to myproject database
//     _db = client.db('myproject');
// });
//------
const mongodb = require("mongodb");
const connectionURL = "mongodb://localhost:27017";
const dbName = "myproject";


//get MongoClient
const MongoClient = mongodb.MongoClient;

let _db = null;

MongoClient.connect(connectionURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err,connectedClient) => {
    if(err){
        throw err;
    }
    //connectedClient will be the connected instance of MongoClient
    _db = connectedClient.db(dbName);
})

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = _db.collection('users');
        const doc = {name, email, password, balance: parseInt(Math.random()*1000) };
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const collection = _db.collection('users')
            collection.find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const collection = _db.collection('users')
            collection.findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const collection = _db.collection('users')            
            collection.findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            
    });    
}


// all users
function all(){
    return new Promise((resolve, reject) => {    
        const collection = _db.collection('users')
            collection.find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all};