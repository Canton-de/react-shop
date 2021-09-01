const Router = require('express')
const router = new Router()
const productController = require('../controllers/product.controller');
const productCartController = require('../controllers/productCart.controller');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/categories/:category', authMiddleware, productController.getProducts);
router.get('/product/:id',authMiddleware, productController.getProduct)
router.put('/rating/:id',authMiddleware, productController.rateProduct)
router.get('/cart', authMiddleware, productCartController.getProductsInCart);
router.post(
  '/new',
  [
    check('name', 'name must be 1-15 length').isLength({ min: 1, max: 15 }),
    check('description', 'description must be 1-50 length').isLength({ min: 1, max: 50 }),
    check('brand', 'brand must be 1-15 length').isLength({ min: 1, max: 15 }),
    check('category', 'category must be 1-15 length').isLength({ min: 1, max: 15 }),
  ],
  authMiddleware,
  productController.addProductToDataBase
);
router.post('/cart', authMiddleware, productCartController.addProductToCart);
router.delete('/cart/:id', authMiddleware, productCartController.removeProductFromCart);
router.get('/search/:category',productController.searchProducts)
router.get('/best-products', productController.getBestProducts);
router.get('/categories', productController.getCategories);

module.exports = router