const express =  require('express');
const router = express.Router();
const crud = require('../CRUD');
const {check,body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const userAuthentication = require('../userAuthentication');

//.......User Routes.............//

//...............................Returns currently authenticated user....................//
router.get('/users',userAuthentication.authenticate,(req,res)=>{
   
    res.status(200);
    res.json({AuthenticatedUser:{
                                firstName:req.currentUser.firstName,
                                lastName:req.currentUser.lastName,
                                emailAddress:req.currentUser.emailAddress} 
                               });
});

//.......................................................................................//

//.............................................Creates a user............................//
router.post('/users',[
   body('firstName').exists().withMessage('Please provide a firstName on the requests body'),
   body('lastName').exists().withMessage('Please provide a lastName on the requests body'),
   body('emailAddress').exists().isEmail().withMessage('Please provide a emailAddress on the requests body'), 
   body('password').exists().withMessage('Please provide a password on the requests body') 
],
   async (req,res)=>{
//Finds the validation errors in this request and wraps them in an object with handy functions    
const errors = validationResult(req) 
//verify that the received description and title are valid
if(!errors.isEmpty()){
    res.status(400);
    res.json({error:errors.array()});
    
}
//create a user if valdiation passed
else{
    //Create the user(if does not exists already)
    await crud.createUser(req,res);
   }
});
//........................................................................................//



module.exports = router;