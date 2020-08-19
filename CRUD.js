const db = require('./db');
const {User,Course} = db.models;
//password hasher module
const bcrypt = require('bcryptjs');

//..................................................Users CRUD............................................................//

//..........Create a user.........//
async function createUser(req){
   try{
     //hash the password before inserting password to database
     const salt = bcrypt.genSaltSync();
     const hash = bcrypt.hashSync(req.body.password,salt);
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: hash
      });
     }
    catch(error){
      if (error.name === 'SequelizeValidationError') {
          const errors = error.errors.map(err => err.message);
           console.error('Validation errors: ', errors);
        } 
        else {
            throw error;
          }
    }
}

//..................................................Courses CRUD............................................................//

//Get courses with user
async function getCourses(courseId){
  let courses;
  if(courseId === undefined){
     courses = await Course.findAll({include:[ {model:User,attributes:['firstName','lastName','emailAddress']}  ]});
  }
  else{
    courses = await Course.findByPk(courseId,{include:[{model:User,attributes:['firstName','lastName','emailAddress']} ]});
  }
     return courses    
}


//Create a course
async function createCourse(req){
   try{
     var newCourse =   await Course.create({
          "userId": req.body.userId,
          "title": req.body.title,
          "description": req.body.description,
          "estimatedTime": req.body.estimatedTime,
          "materialsNeeded": req.body.title       
      });
   }
   catch(error){
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
       console.error('Validation errors: ', errors);
    } 
    else {
        throw error;
      }
   }
  return newCourse
}

//Update a course
async function updateCourse(courseId,req){
  const course =  await Course.findByPk(courseId);
  course.userId = req.body.userId;
  course.title = req.body.title;
  course.description = req.body.description;
  course.estimatedTime = req.body.estimatedTime;
  course.materialsNeeded = req.body.materialsNeeded;
  await course.save();
  
}

//Delete a course
async function deleteCourse(courseId){
     //find course
     const course = await Course.findByPk(courseId);
     //Delete 
     await course.destroy();
}






module.exports = {createUser:createUser,
                  getCourses:getCourses,
                  createCourse:createCourse,
                  updateCourse:updateCourse,
                  deleteCourse:deleteCourse
                }