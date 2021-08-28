const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/CartModel');
const config = require('config')
const productCartService = require('../services/productCart.service.js')
const colors = require('colors');

class ProductCartController {
  async addProductToDataBase(req, res) {
    try {
      if (!req.user) return res.status(403).send({ message: 'no token' });
      const { id } = req.user;
      const candidate = await User.findById(id);
      if (!candidate) return res.status(404, { message: 'invalid token' });
      if (candidate.type !== 'admin') {
        return res.status(401).send({ message: 'you dont have access' });
      }
      const { file } = req.files;
      const isFileArray = Array.isArray(file);
      let images;
      if (isFileArray) images = file.map((file) => file.name);
      else images = [file.name];
      const { name, description, category, brand, price, countInStock } = req.body;
      const product = new Product({
        name,
        description,
        category,
        brand,
        price,
        countInStock,
        images,
      });
      await product.save();
      if (isFileArray) {
        for (let f of file) await f.mv(`${config.get('filePath')}\\${f.name}`);
      } else await file.mv(`${config.get('filePath')}\\${file.name}`);

      res.send(product);
    } catch (e) {
      console.log(`Error ${e}`.red.underline.bold);
      res.status(500).send({ message: e });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { id } = req.user;
      const { productId } = req.body;
      const cart = await productCartService.addProductToCart(productId, id);
      res.send(cart.products);
    } catch (e) {
      console.log(`Error ${e}`.red.underline.bold);
      return res.status(500).send({ message: e });
    }
  }

  async removeProductFromCart(req, res) {
    try {
      console.log(req.params)
      const { id } = req.user;
      const candidate = await User.findById(id);
      if (!candidate) return res.status(404, { message: 'invalid token' });
      const cart = await productCartService.removeProductFromCart(req.params.id,id);
      res.send(cart.products);
    } catch (e) {
      console.log(`Error ${e}`.red.underline.bold);
      return res.status(500).send({ message: e });
    }
  }

  async getProductsInCart(req, res) {
    try {
        const { id } = req.user;
        const candidate = await User.findById(id);
        if (!candidate) return res.status(404, { message: 'invalid token' });
        const {products} = await Cart.findOne({ user: id });
        console.log(id)
        res.send(products)
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: e });
    }
  }
}

module.exports = new ProductCartController();