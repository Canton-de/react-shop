const {model,Schema,ObjectId} = require('mongoose')

const CartSchema = Schema({
  user: { type: ObjectId, ref: 'User', required: true },
  products: [
    {
      name: { type: String, reqired: true },
      image: { type: String, reqired: true },
      count: { type: Number, reqired: true },
      price: { type: Number, reqired: true },
      previousPrice: { type: Number },
      product: { type: ObjectId, ref: 'Product', reqired: true },
    },
  ],
});

module.exports = model('Cart',CartSchema)