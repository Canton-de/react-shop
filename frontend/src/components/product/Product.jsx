import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Descriptions, Carousel } from 'antd';
import axios from 'axios';
import RateC from '../rate-c/RateC';
import styles from './product.module.scss';
import cutString from '../../helpers/cutString';

const Product = () => {
  const [curProduct, setCurProduct] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const loadProduct = async () => {
      const { data } = await axios.get(`/api/product/product/${id}`);
      setCurProduct(data);
      setIsLoaded(true);
    };
    loadProduct();
  }, [id]);
  return (
    <div className="site-layout-content">
      {isLoaded && (
        <div className={styles.product}>
          <div className={styles.title}>{cutString(`${curProduct.name}`, 60)}</div>
          <div className={styles.layoutItem}>
            <div>
              <Carousel>
                {curProduct.images.map((image) => (
                  <>
                    <div className={styles['slider-image-wrapper']}>
                      <img
                        className={styles['slider-image']}
                        src={`http://localhost:5000/images/${image}`}
                        alt="product"
                      />
                    </div>
                  </>
                ))}
              </Carousel>
            </div>
            <Descriptions style={{ marginBottom: '12px' }} title="Product Info" layout="vertical" bordered>
              <Descriptions.Item label="Product">{curProduct.name}</Descriptions.Item>
              <Descriptions.Item label="Rating">
                <RateC rating={curProduct.rating} reviewsCount={curProduct.rates.length} />
              </Descriptions.Item>

              <Descriptions.Item label="Brand">{curProduct.brand}</Descriptions.Item>
              <Descriptions.Item label="Category">{curProduct.category}</Descriptions.Item>
              <Descriptions.Item label="Description">{curProduct.description}</Descriptions.Item>
              <Descriptions.Item label="Count in stock">{curProduct.countInStock}</Descriptions.Item>
            </Descriptions>

            <Button disabled={!curProduct.countInStock} className={styles['cart-add']}>
              Add to cart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
