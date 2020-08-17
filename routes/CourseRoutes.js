const express = require('express');
const router = express.Router();
const db = require('../db');
const {Course} = db.models;
const crud = require('../CRUD');

//.............Course Routes.............//

//Returns a list of courses(including the users that owns each course)
router.get('/courses',async (req,res)=>{
    const courses = crud.getCourses();
    console.log(courses);
    res.status(200);
    
});

//Returns the course(user included) based on course ID
router.get('/courses/:id',(req,res)=>{
    res.status(200)
})

//Creates a course
router.post('/courses/',(req,res)=>{
    res.status(201);
});

//Updates a course and returns no content
router.put('/courses/:id',(req,res)=>{
    res.status(204);
});

//Deletes a courses and returns no content
router.delete('/courses/:id',(req,res)=>{
    res.status(204);
});



module.exports = router;