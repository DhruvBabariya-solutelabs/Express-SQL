import Sequelize from 'sequelize';
import sequelize from '../util/database.js';

const Product  = sequelize.define('product',{
    id:{
      type :Sequelize.INTEGER,
      allowNull : false,
      autoIncrement : true,
      primaryKey : true
    },
    title: Sequelize.STRING,
    price:{
      type : Sequelize.DOUBLE,
      allowNull:false,
    },
    imageUrl:{
      type: Sequelize.STRING,
      allowNull:false,
    },
    description :{
      type : Sequelize.STRING,
      allowNull:false
    }
});

export default Product;