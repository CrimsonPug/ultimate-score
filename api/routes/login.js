const knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password : 'postgres',
    database : 'ultimate',
    charset  : 'utf8'
  }
});
const bookshelf = require('bookshelf')(knex);
const User = bookshelf.Model.extend({tableName: 'users'})
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//middleware
const authorize     = require('./../middleware/authorize');

//POST endpoint for registration
router.post('/encrypt',(req,res) => {
    let newUsername = req.body.username;
    let newPassword = req.body.password;
    //generate salt and create a hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
                // Store hash in your password DB. 
                if(err) console.log(err);
                   const newUser = new User({
                            username:newUsername,
                            password:hash
                            })
                    newUser.save()
                    .then(user => {
                    res.json(user)
                    })
                });
        });
});

//POST endpoint for logging in to the server
router.post('/', (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
//fetch the matching username and compare the password
     User
        .where({username:username})
        .fetch()
        .then(user => {
            if(user === null){
                  res
                    .status(203)
                    .send({token:null});
            }else{
                bcrypt.compare(password, user.attributes.password.toString(), function(err, result) {
                    if(result){
                        //sign a token in successful login and send to client side
                        let token = jwt.sign({username:username},'brainstationkey');
                        res.json({token:token});
                        console.log('token created')
                    }
                    else{
                        res
                        .status(203)
                        .send({token:null});
                    }
                });
            
            }
        })  
})

router.get('/privatedata', authorize, (req,res)=>{

    // TASK 5: This endpoint should require that all requests to this endpoint pass through the middleware created in the previous task.
    
    console.log(req.decoded.username);
    console.log('logged in')
    // TASK 6: If the request passes through the middleware and makes it to this endpoint, send back the username that was stored in the token. 

    res
    .json(req.decoded.username)
    
})

module.exports = router;