const Product = require('../models/Product');
const config = require('config');
const productService = require('../services/product.service.js');
const colors = require('colors');
const User = require('../models/User');

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await Product.find({ category: req.params.category });
      if (!req.user) return res.send(products);
      const { id } = req.user;
      // const productsWithUser = await productService.getProductWithUserCount(products, id);
      res.send(products);
    } catch (e) {
      console.log(`Error ${e}`.red.underline.bold);
      res.status(500).send({ message: e });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      res.send(product);
    } catch (e) {
      console.log(`Error ${e}`.red.underline.bold);
      res.status(500).send({ message: e });
    }
  }

  async rateProduct(req, res) {
    try {
      console.log(req.body.rating);
      const { id } = req.user;
      const product = await Product.findById(req.params.id);
      const rate = product.rates.find((rate) => String(rate.user) === id);
      const rating = +req.body.rating;
      if (rating > 5 || rating < 0.5) return res.status(403).send({ message: 'invalid rating' });
      if (!rate) {
        product.rates.push({ user: id, rating });
        product.rating = (product.rating + rating) / product.rates.length;
        await product.save();
        return res.send(product);
      }
      const diff = (rating - rate.rating) / product.rates.length;
      rate.rating = rating;
      product.rating += diff;
      await product.save();
      res.send(product);
    } catch (e) {
      console.log(e);
      res.send({ message: 'fail' });
    }
  }

  async searchProducts(req, res) {
    try {
      let products;
      console.log(req.query.q);
      if (req.query.q === 'undefined') products = await Product.find({ category: req.params.category });
      else products = await Product.find({ category: req.params.category, name: { $regex: req.query.q } });
      res.send(products);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'server error' });
    }
  }
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
      console.log(`Error ${e} qqqq`.red.underline.bold);
      res.status(500).send({ message: e });
    }
  }
}

module.exports = new ProductController();
