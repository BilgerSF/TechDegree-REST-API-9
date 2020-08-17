const db = require('./db');
const {User,Course} = db.models;

//..........Create a user.........//
async function createUser(req){
   try{
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: req.body.password
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

//.....Get courses with user...//
async function getCourses(){
     const courses = await Course.findAll({include:User});
   console.log(courses);
    return courses    
}



module.exports = {createUser:createUser,getCourses:getCourses}