/*
User Authenthication Process:

1- Parse authorization header into the user's credentials (email and password)
2- Check that user exists by finding the provided email address on the database
3- If the user exists; compare the received password with the password stored on the databse
4- Add a property to the request object with the current user so that
5- The follow middleware functions will have access to the user's information
example: req.currentUser = authenticated username;
*/

//Import user model
const db = require('./db');
const {User} = db.models;

//password hasher module
const bcrypt = require('bcryptjs');
//Basic authorization header parser module\
const auth = require('basic-auth');
const e = require('express');


async function authenticate(req,res,next){
//parse authorization header into the user's credentials (email and password)
    const user = auth(req)
    const username = user.name;
    const password = user.pass;
//check that user exists by finding the provided email address on the database
    const userExists = await User.findAll({where:{emailAddress:username}});
//if the user exists, hash the password and compare it to the password stored on the databse
    
   if(userExists.length > 0 ){
       //Get database password(hashed)
       const dbPassword = userExists[0].dataValues.password;
       //Compare database password with the password received trough req
       const verifiedPassword = bcrypt.compareSync(password,dbPassword);
       console.log(verifiedPassword)

       //if true then the user has been succesfully authenticated(logged in)
        if(verifiedPassword){
             //add user to the req object so that it can be used later in routes
            req.currentUser = userExists[0].dataValues;
            //Go to the next middleware(route handler in this case)
            next();
        }
        else{
            res.json({AuthStatus:"Incorrect username or password"})
        }
    }
    else{
        console.log('User does not exists')
        res.status(404);
        //add password does not exists due to security
        res.json({AuthStatus:"Incorrect username or password"}).end();
    }

}

module.exports = {authenticate}