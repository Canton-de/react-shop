import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Descriptions, Carousel } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import RateC from '../rate-c/RateC';
import styles from './product.module.scss';
import cutString from '../../helpers/cutString';
import cartApi from '../../api/cartApi';
import { setLoginModal } from '../../store/reducers/login/actions';
import { setProductsInCart } from '../../store/reducers/cart/actions';
import Loader from '../loader/Loader';
import serverUrl from '../../helpers/serverUrl';

const Product = () => {
  const [curProduct, setCurProduct] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const addToCartHandler = async () => {
    if (!localStorage.getItem('token')) dispatch(setLoginModal(true));
    else {
      const newProducts = await cartApi.addToCart(curProduct._id);
      dispatch(setProductsInCart(newProducts));
    }
  };
  useEffect(() => {
    const loadProduct = async () => {
      const { data } = await axios.get(`${serverUrl()}api/product/product/${id}`);
      setCurProduct(data);
      setIsLoaded(true);
    };
    loadProduct();
  }, [id]);
  return (
    <div className="site-layout-content">
      {!isLoaded ? (
        <Loader />
      ) : (
        <div className={styles.product}>
          <div className={styles.title}>{cutString(`${curProduct?.name}`, 60)}</div>
          <div className={styles.layoutItem}>
            <div>
              <Carousel>
                {curProduct.images?.map((image) => (
                  <>
                    <div className={styles['slider-image-wrapper']}>
                      <img className={styles['slider-image']} src={`${serverUrl()}/images/${image}`} alt="product" />
                    </div>
                  </>
                ))}
              </Carousel>
            </div>
            <Descriptions style={{ marginBottom: '12px' }} title="Product Info" layout="vertical" bordered>
              <Descriptions.Item label="Product">{curProduct.name}</Descriptions.Item>
              <Descriptions.Item label="Rating">
                <RateC rating={curProduct.rating} productId={curProduct._id} reviewsCount={curProduct?.rates?.length} />
              </Descriptions.Item>

              <Descriptions.Item label="Brand">{curProduct.brand}</Descriptions.Item>
              <Descriptions.Item label="Category">{curProduct.category}</Descriptions.Item>
              <Descriptions.Item label="Description">{curProduct.description}</Descriptions.Item>
              <Descriptions.Item label="Count in stock">{curProduct.countInStock}</Descriptions.Item>
            </Descriptions>

            <Button disabled={!curProduct.countInStock} onClick={addToCartHandler} className={styles['cart-add']}>
              Add to cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
