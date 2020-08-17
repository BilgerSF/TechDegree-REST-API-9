//.............................................Define the table/fields....................................//

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    firstName:{ 
        type: Sequelize.STRING
    },
    
    lastName: {
        type: Sequelize.STRING
    },

    emailAddress:{
        type: Sequelize.STRING
    },

    password:{
        type: Sequelize.STRING
    }



  }, { 
    
    sequelize 
  });

//Create relationship between Course and User. One-to-Many relationship 
User.associate = (models) => {
  // define association between tables
  // a "user" has many "courses"
  User.hasMany(models.Course, {
    foreignKey: {
      fieldName: 'userId', 
      allowNull: false,
    },
  });
};
  return User;
};