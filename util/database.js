import Sequelize from 'sequelize';

const sequelize = new Sequelize('node-complete','root','root',{
    dialect : 'mysql',
    host : 'localhost' 
});
export default sequelize;
