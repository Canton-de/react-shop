import { Rate } from 'antd';
import axios from 'axios';
import styles from './rate-c.module.scss';

const RateC = ({ rating, reviewsCount, productId, ...rest }) => {
  const rateHandlder = (ratingq) => {
    axios.put(
      `/api/product/rating/${productId}`,
      {
        rating: ratingq,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }
    );
  };
  return (
    <div {...rest}>
      <Rate allowHalf onChange={rateHandlder} defaultValue={rating} />
      <span className={styles['reviews-count']}>{reviewsCount}</span>
    </div>
  );
};

export default RateC;
