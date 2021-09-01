import { Card, Carousel, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './product-item.module.scss';
import cutString from '../../helpers/cutString';
import RateC from '../rate-c/RateC';
import makeSeparatedPrice from '../../helpers/makeSeparatedPrice';
import cartApi from '../../api/cartApi';
import { setLoginModal } from '../../store/reducers/login/actions';
import { setProductsInCart } from '../../store/reducers/cart/actions';
import serverUrl from '../../helpers/serverUrl';

const ProductItem = ({ product }) => {
  const { products: productsInCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const addToCartHandler = async () => {
    if (!localStorage.getItem('token')) dispatch(setLoginModal(true));
    else {
      const newProducts = await cartApi.addToCart(product._id);
      dispatch(setProductsInCart(newProducts));
    }
  };
  const goToCart = () => {
    history.push('/cart');
  };
  return (
    <>
      <Card className={styles.product}>
        <div className={styles.layoutItem}>
          <div style={{ width: 200 }}>
            <Carousel style={{ width: 200 }}>
              {product.images.map((image) => (
                <div key={image} className={styles['slider-image']}>
                  <img height="160px" src={`${serverUrl()}/images/${image}`} alt="product" />
                </div>
              ))}
            </Carousel>
          </div>
          <div className={styles['product-info-wrapper']}>
            <Link to={`/product/${product._id}`}>
              <span className={styles.title}>{cutString(`${product.name}`, 60)}</span>
            </Link>
            <div className={styles.description}>{cutString(product.description, 160)}</div>
            <RateC
              className={styles['rate-c']}
              rating={product.rating}
              productId={product._id}
              reviewsCount={product.rates.length}
            />
          </div>
          <div className={styles['buy-wrapper']}>
            <div className={styles['previous-price']}>
              {' '}
              {product.previousPrice && makeSeparatedPrice(product.previousPrice)}
            </div>
            <div className={styles['current-price']}>{makeSeparatedPrice(product.price)} Р</div>
          </div>
          <Button
            onClick={
              !productsInCart.find((productInCart) => productInCart.product === product._id)
                ? addToCartHandler
                : goToCart
            }
            className={styles['cart-add']}
          >
            {!productsInCart.find((productInCart) => productInCart.product === product._id) ? (
              'Add to cart'
            ) : (
              <div className={styles.pop}>go to cart</div>
            )}
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ProductItem;
