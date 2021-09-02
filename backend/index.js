const express = require('express')
const app = express()
const cors = require('cors');
const fileUpload = require('express-fileupload')
const userRouter = require('./routes/auth-routes');
const productRouter = require('./routes/product-routes');
const filePathMidleWare = require('./middlewares/filePath.middleware');
const config = require('config')
const mongoose = require('mongoose')
const colors = require('colors')
const path = require('path')
const {cloudinary} = require('./cloudinaryConfig')

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(fileUpload({ uriDecodeFileNames: true }));
app.use(filePathMidleWare(path.resolve(__dirname, 'public', 'images')));
app.options("*", cors());
app.use('/api/auth',userRouter)
app.use('/api/product', productRouter);

const PORT = process.env.PORT || config.get('serverPort')
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