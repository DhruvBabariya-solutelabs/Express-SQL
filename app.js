import path from 'path';
import express from 'express';
import bodyParser from 'body-parser'
import errorController from './controllers/error.js'

import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js'
import sequelize from './util/database.js';
import Product from './models/product.js';
import User from './models/user.js';
import Cart from './models/cart.js';
import CartItem from './models/cart-item.js';
import Order from './models/order.js';
import OrderItem from './models/order-item.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(path.dirname(process.cwd()),'Express-js','public')));

app.use((req,res,next)=>{
    User.findByPk(1)
        .then(user=>{
            req.user = user;
            next();
        })
})

app.use('/admin', adminRoutes.router);
app.use(shopRoutes.router);

app.use(errorController.get404);

Product.belongsTo(User,{constraints : true, onDelete : 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through : CartItem});
Product.belongsToMany(Cart,{through : CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through : OrderItem});
sequelize.sync()
    .then(result =>{
        return User.findByPk(1);   
    })
    .then(user =>{
        if(!user){
            return User.create({name : 'Dhruv',email: 'dhruv@test.com'});
        }
        return user;
    })
    .then(user =>{
        return user.createCart();
            
    })
    .then(cart=>{
        app.listen(2000,()=>{
            console.log("Server is started...");
        }); 
    })
    .catch(err =>{
        console.log(err);
    })