import Sequelize from 'sequelize';
import sequelize from '../util/database.js';

const User = sequelize.define('user',{
    
    id:{
        type: Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    name: Sequelize.STRING,
    email:Sequelize.STRING
});

export default User;