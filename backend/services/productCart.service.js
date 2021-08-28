const Cart = require('../models/CartModel')
const Product = require('../models/Product')


class ProductCartService {
  async addProductToCart(productId, userId) {
    const cart = await Cart.findOne({user:userId})
    const productsInCart = cart.products
    const productInCart = productsInCart.find((p) => String(p.product)===productId );
    const product = await Product.findById(productId);
    if (productInCart){
      if(productInCart.count + 1 > product.countInStock) return cart;
      productInCart.count += 1;
    }
    else {
      productsInCart.push({
        name: product.name,
        image: product.images[0],
        price: product.price,
        product: productId,
        count: 1
      });
    }
    await cart.save()
    return cart;
  }

  async removeProductFromCart(productId, userId) {
    const cart = await Cart.findOne({user:userId})
    let productsInCart = cart.products
    let prodIndex 
    const productInCart = productsInCart.find((p,index) => {
      if(String(p.product)===productId){
        prodIndex = index;
        return true
      }
    });
    if(productInCart.count-1 <= 0 ){
      productsInCart.splice(prodIndex,1)
    }else{
      productInCart.count-=1
    }
    await cart.save()
    return cart;
  }
}

module.exports = new ProductCartService