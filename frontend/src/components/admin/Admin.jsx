import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ImageLoader from '../image-loader/ImageLoader';
import adminApi from '../../api/adminApi';
import styles from './amin.module.scss';
import InputUseForm from '../import-use-form/InputUseForm';

const productSchema = yup.object().shape({
  name: yup.string().min(1).max(15).required(),
  description: yup.string().min(1).max(50).required(),
  price: yup.number().required(),
  previousPrice: yup.number(),
  category: yup.string().min(1).max(15).required(),
  brand: yup.string().min(1).max(15).required(),
  countInStock: yup.number().required(),
});
const Admin = () => {
  const { userType } = useSelector((store) => store.user);
  const history = useHistory();
  const [fileList, setFileList] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(productSchema),
  });
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
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
        <InputUseForm name="price" register={register} error={errors.price} type="number" />
        <InputUseForm name="previousPrice" register={register} error={errors.previousPrice} type="number" />
        <InputUseForm name="category" register={register} error={errors.category} type="text" />
        <InputUseForm name="brand" register={register} error={errors.brand} type="text" />
        <InputUseForm name="countInStock" register={register} error={errors.countInStock} type="number" />
        <button
          onClick={handleSubmit((data) => adminApi.addToDataBase(data, fileList))}
          type="submit"
          style={{ width: '100%' }}
        >
          Добавить
        </button>
      </div>
    </form>
  );
};

export default Admin;
