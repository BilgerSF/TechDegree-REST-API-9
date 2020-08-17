const express =  require('express');
const router = express.Router();
const crud = require('../CRUD');
//.......User Routes.............//



//Returns currently authenticated users
router.get('/users',(req,res)=>{
    res.status(200);
});
//Creates a user
router.post('/users',async (req,res)=>{
    console.log(req.firstName)
    crud.createUser(req);
    res.status(201);
    res.location('/').end();
});


module.exports = router;