const express = require('express')
const app = express()
const cors = require('cors');
const fileUpload = require('express-fileupload')
const userRouter = require('./routes/auth-routes');
const productRouter = require('./routes/product-routes');
const config = require('config')
const mongoose = require('mongoose')
const colors = require('colors')

app.use(express.json())
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(fileUpload({ uriDecodeFileNames: true }));
app.options("*", cors());
app.use('/api/auth',userRouter)
app.use('/api/product', productRouter);

const PORT = config.get('PORT');
const dbUrl = config.get('dbUrl')

const start = async () => {
  try {
    await mongoose.connect(dbUrl,{
      useNewUrlParse: true,
      useUnifiedTopology:true
    });
    app.listen(PORT, () => console.log(`server started on port : ${PORT}`.cyan.bold));
  } catch (e) {
    console.log(`Error: ${e}`.red.underline.bold);
  }
};
start();