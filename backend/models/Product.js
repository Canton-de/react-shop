const {model,Schema,ObjectId} = require('mongoose')

const Product = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  previousPrice: { type: Number },
  rates: [{
    user:{type:ObjectId,ref:'User'},
    rating:{type:Number,required:true}
  }],
  rating:{type:Number,default:0},
  images: [{ type: String, required: true }],
});

module.exports = model('Product',Product)