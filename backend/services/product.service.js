const Cart = require('../models/CartModel')

class ProductService {
    // async getProductWithUserCount(products,userId){
    //     const cart = await Cart.findOne({user:userId})
    //     const userProducts = cart.products
    //     if(!userProducts) return products;
    //     const productsWCount = JSON.parse(JSON.stringify(products)).map(product=>{
    //         for(let p of userProducts){
    //             if(String(p.product) === String(product._id)) product.inCart = true
    //         }
    //         return product
    //     })
    //     console.log(productsWCount);
    //     return productsWCount;
    // }
}

module.exports = new ProductService()