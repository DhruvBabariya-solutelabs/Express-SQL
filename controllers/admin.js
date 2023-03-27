import Product from '../models/product.js'

const getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing : false
  });
};

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({ title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
  })
  .then(()=>{
    console.log("Product Created");
    res.redirect('/');
  })
  .catch((err)=>{
    console.log(err);
  })
};

const getProducts = (req, res, next) => {
  Product.findAll()
    .then(products =>{
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err=>{
      console.log(err);
    })
};

const editProduct =(req,res,next)=>{
  const prodId = req.params.productId;
  console.log(prodId);
  const editing = req.query.editing;

  req.user.getProducts({where : {id : prodId}})

  .then(products=>{
    const product = products[0];
      if(!product){
        res.redirect('/');
      }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/edit-product',
      editing : editing,
      product : product
    })
  })
  .catch(err => console.log(err));
}

const updateProduct = (req,res,next)=>{
  const updatedId= req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  Product.findByPk(updatedId)
    .then(product =>{
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDescription;
      return product.save();
    })
    .then(result =>{
      console.log("PRODUCT UPDATED");
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
}

const postDeleteProduct  =(req,res,next)=>{
   const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product=>{
        return product.destroy();
    })
    .then(result =>{
      console.log("PRODUCT DELETED");
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}
export default {getAddProduct,postAddProduct,getProducts,editProduct,updateProduct,postDeleteProduct};