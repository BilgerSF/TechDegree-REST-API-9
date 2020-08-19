const express = require('express');
const router = express.Router();
const db = require('../db');
const {Course} = db.models;
const crud = require('../CRUD');
const {check,body,validationResult} = require('express-validator');
//.............Course Routes.............//



//..........................Returns a list of courses(including the users that owns each course)............//
router.get('/courses',async (req,res)=>{
    const courses = await crud.getCourses();
    res.status(200);
    res.json(courses);
});

//Returns the course(user included) based on course ID
router.get('/courses/:id', async (req,res)=>{
    const courseId = req.params.id;
    const course = await crud.getCourses(courseId);
    res.status(200)
    res.json(course);
})
//...........................................................................................................//


//..............................................Creates a course.............................................//
router.post('/courses/',[
    body('description').exists().withMessage("Please provide a description on the requests body")
    ,body('title').exists().withMessage("Please provide a title on the requests body")
] 

, async (req,res)=>{
//Finds the validation errors in this request and wraps them in an object with handy functions    
const errors = validationResult(req);
//verify that the received description and title are valid
if(!errors.isEmpty()){
    res.status(400);
    res.json({error:errors.array()});
    
}

//Create a course if validation passed!
  else{
   const course = await crud.createCourse(req);
    const courseId = course.dataValues.id;
    res.status(201);
//Returns id of the created course so it can be used on the location header URI
    res.location(`/courses/${courseId}`).end();
  }
   });

//................................................................................................................//


//.......................................Updates a course and returns no content..................................//
router.put('/courses/:id',[
    body('description').exists().withMessage("Please provide a description on the requests body")
    ,body('title').exists().withMessage("Please provide a title on the requests body")
],  
  async (req,res)=>{

//Finds the validation errors in this request and wraps them in an object with handy functions    
  const errors = validationResult(req);
//verify that the received description and title are valid
if(!errors.isEmpty()){
    res.status(400);
    res.json({error:errors.array()});
    
}

//Update course if validation passed
else{
    const courseId = req.params.id;
    await crud.updateCourse(courseId,req);
    res.status(204);
    res.end();
}

});

//................................................................................................................//


//......................................Deletes a courses and returns no content..................................//
router.delete('/courses/:id',async (req,res)=>{
    await crud.deleteCourse(req.params.id);
    res.status(204);
    res.end();
});
//.................................................................................................................//


module.exports = router;