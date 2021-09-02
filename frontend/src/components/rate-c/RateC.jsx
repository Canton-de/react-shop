import { Rate } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './rate-c.module.scss';
import { setLoginModal } from '../../store/reducers/login/actions';

const RateC = ({ rating, reviewsCount, productId, ...rest }) => {
  const [curRating, setCurRating] = useState(rating);
  const [curReviewsCount, setCurReviewsCount] = useState(reviewsCount);
  const dispatch = useDispatch();
  const rateHandlder = async (ratingq) => {
    if (!localStorage.getItem('token')) dispatch(setLoginModal(true));
    else {
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
    }
  };
  return (
    <div {...rest}>
      <Rate allowClear={false} allowHalf onChange={rateHandlder} value={curRating} />
      <span className={styles['reviews-count']}>{curReviewsCount}</span>
    </div>
  );
};

export default RateC;
