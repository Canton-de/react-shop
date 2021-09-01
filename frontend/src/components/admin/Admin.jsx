import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from 'antd';
import ImageLoader from '../image-loader/ImageLoader';
import adminApi from '../../api/adminApi';
import styles from './amin.module.scss';
import InputUseForm from '../import-use-form/InputUseForm';

function warning() {
  Modal.warning({
    title: 'Warning message',
    content: 'You have to upload at least 1 image',
  });
}

function error(errors) {
  Modal.error({
    title: 'Error message',
    content: errors?.map((error) => <div className={styles.error}>{error}</div>),
  });
}

function success() {
  let secondsToGo = 3;
  const modal = Modal.success({
    title: 'Товар был успешно добавлен',
    content: `Это сообщение закроется через ${secondsToGo} секунд.`,
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `Это сообщение закроется через ${secondsToGo} секунд.`,
    });
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
}
const productSchema = yup.object().shape({
  name: yup.string().min(1).max(15).required(),
  description: yup.string().min(1).max(250).required(),
  price: yup.number().min(1).required(),
  category: yup.string().min(1).max(25).required(),
  brand: yup.string().min(1).max(25).required(),
  countInStock: yup.number().min(1).required(),
});
const Admin = () => {
  const { userType } = useSelector((store) => store.user);
  const history = useHistory();
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(productSchema),
  });
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmitData = (data) => {
    if (fileList.length === 0) {
      warning();
    } else {
      const loadProduct = async () => {
        try {
          setIsLoading(true);
          await adminApi.addToDataBase(data, fileList);
          reset();
          setFileList([]);
          success();
        } catch (e) {
          error(e.response?.data?.errors?.map((err) => err.msg));
        } finally {
          setIsLoading(false);
        }
      };
      loadProduct();
    }
  };

  useEffect(() => {
    if (userType !== 'admin') history.push('/');
  }, [history, userType]);
  return (
    <form>
      <div>Добавить товар</div>
      <ImageLoader fileList={fileList} handleChange={handleChange} />
      <div className={styles.form}>
        <InputUseForm name="name" register={register} error={errors.name} type="text" />
        <InputUseForm name="description" register={register} error={errors.description} type="text" />
        <InputUseForm name="price" register={register} error={errors.price} type="number" min="0" />
        <InputUseForm name="previousPrice" register={register} error={errors.previousPrice} type="number" min="0" />
        <InputUseForm name="category" register={register} error={errors.category} type="text" />
        <InputUseForm name="brand" register={register} error={errors.brand} type="text" />
        <InputUseForm name="countInStock" register={register} error={errors.countInStock} type="number" min="1" />
        <button
          disabled={isLoading}
          onClick={handleSubmit((data) => handleSubmitData(data))}
          type="submit"
          className={`${styles.button} ${isLoading ? styles.disabled : null}`}
        >
          Добавить
        </button>
      </div>
    </form>
  );
};

export default Admin;
