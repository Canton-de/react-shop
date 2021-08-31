const Router = require('express')
const router = new Router()
const productController = require('../controllers/product.controller');
const productCartController = require('../controllers/productCart.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/categories/:category', authMiddleware, productController.getProducts);
router.get('/product/:id',authMiddleware, productController.getProduct)
router.put('/rating/:id',authMiddleware, productController.rateProduct)
router.get('/cart', authMiddleware, productCartController.getProductsInCart);
router.post('/new', authMiddleware, productController.addProductToDataBase);
router.post('/cart', authMiddleware, productCartController.addProductToCart);
router.delete('/cart/:id', authMiddleware, productCartController.removeProductFromCart);
router.get('/search/:category',productController.searchProducts)
router.get('/best-products', productController.getBestProducts);

module.exports = router