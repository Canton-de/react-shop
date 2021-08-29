import { Rate } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import styles from './rate-c.module.scss';

const RateC = ({ rating, reviewsCount, productId, ...rest }) => {
  const [curRating, setCurRating] = useState(rating);
  const [curReviewsCount, setCurReviewsCount] = useState(reviewsCount);
  const rateHandlder = async (ratingq) => {
    const { data } = await axios.put(
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
    setCurRating(data.rating);
    setCurReviewsCount(data.rates.length);
  };
  return (
    <div {...rest}>
      <Rate allowHalf onChange={rateHandlder} value={Math.round(curRating)} />
      <span className={styles['reviews-count']}>{curReviewsCount}</span>
    </div>
  );
};

export default RateC;
