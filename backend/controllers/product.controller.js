const Product = require('../models/Product');
const colors = require('colors');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const path = require('path');

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await Product.find({ category: req.params.category });
      if (!req.user) return res.send(products);
      const { id } = req.user;
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
      const { id } = req.user;
      const product = await Product.findById(req.params.id);
      const rate = product.rates.find((rate) => String(rate.user) === id);
      const rating = +req.body.rating;
      if (rating > 5 || rating < 0.5) return res.status(403).send({ message: 'invalid rating' });
      if (!rate) {
        product.rates.push({ user: id, rating });
        product.rating = (product.rating * (product.rates.length-1) + rating) / product.rates.length;
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
      const pageSize = 7
      let products;
      const objToFind = {}
      if(req.params.category !== 'search') objToFind.category = req.params.category;
      if(req.query.price){
        objToFind.price = { $gte: req.query.price.split('-')[0], $lte: req.query.price.split('-')[1] };
      }
      if (req.query.q) {
        objToFind.name= {$regex: req.query.q}
      }
      const {sort} = req.query
      if(sort) {
        let [sortCriteria,sortDirection] = sort.split('-')
        sortDirection = sortDirection==='y'?1:-1
        const count = await Product.find(objToFind)
          .sort({ [sortCriteria]: sortDirection })
          .count();
        products = await Product.find(objToFind)
          .sort({ [sortCriteria]: sortDirection })
          .skip((req.query.page - 1) * pageSize || 0)
          .limit(pageSize);
        return res.send({ products, count });
      }
      products = await Product.find(objToFind)
        .skip((req.query.page - 1) * pageSize || 0)
        .limit(pageSize);
      const count = await Product.find(objToFind).count()
      res.send({products,count});
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'server error' });
    }
  }
  async getBestProducts(req, res) {
    try {
      let products;
      products = await Product.find().sort({ 'rating': -1 }).limit(5);
      res.send(products);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'server error' });
    }
  }
  async addProductToDataBase(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if (!req.user) return res.status(403).send({ message: 'no token' });
      const { id } = req.user;
      const candidate = await User.findById(id);
      if (!candidate) return res.status(404, { message: 'invalid token' });
      if (candidate.type !== 'admin') {
        return res.status(401).send({ message: 'you dont have access' });
      }
      const {files} = req
      let images = Object.values(files).map((file) => file.name);
      const { name, description, category, brand, price, countInStock,previousPrice } = req.body;
      const newObject = { name, description, category, brand, price, countInStock, images}
      if(+previousPrice!==0) newObject.previousPrice = previousPrice
      const product = new Product(newObject);
      await product.save();
      for(let i in files){
        await files[i].mv(path.resolve(req.filePath, files[i].name));
      }
      res.send(product);
    } catch (e) {
      console.log(`Error ${e}`.red.underline.bold);
      res.status(500).send({ message: e });
    }
  }
  async getCategories(req,res) {
    const categories = await Product.find({}, { category:1});
    res.send([...new Set(categories.map(el=>el.category))].sort())
  }
}

module.exports = new ProductController();
