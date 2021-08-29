import { useState, useEffect } from 'react';
import Modal from 'antd/lib/modal/Modal';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login-modal.module.scss';
import { registerUser } from '../../store/reducers/register/registerReducer';

const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).max(12).required(),
  name: yup.string().required(),
});
const LoginModal = ({ handleOpen, isOpen }) => {
  const handleCancel = () => {
    handleOpen(false);
  };
  const { isRegistrating } = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(LoginSchema),
  });
  const onSubmit = (data) => {
    setConfirmLoading(true);
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (!isRegistrating) {
      handleOpen(false);
      setConfirmLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegistrating]);

  return (
    <>
      <Modal
        confirmLoading={confirmLoading}
        visible={isOpen}
        title="Sign in"
        onCancel={handleCancel}
        onOk={handleSubmit((data) => onSubmit(data))}
        okText="Войти"
      >
        <label htmlFor="email" className={styles.subtitle}>
          Email address
        </label>
        <input
          className={errors.email ? styles.inputError : styles.input}
          id="email"
          type="text"
          placeholder="Email address"
          {...register('email')}
        />
        <p className={styles.error}>{errors?.email?.message}</p>
        <label htmlFor="password" className={styles.subtitle}>
          Password
        </label>
        <input
          id="password"
          type="password"
          className={errors.password ? styles.inputError : styles.input}
          placeholder="Password"
          {...register('password')}
        />
        <p className={styles.error}>{errors?.password?.message}</p>
        <label htmlFor="name" className={styles.subtitle}>
          Name
        </label>
        <input
          id="name"
          type="text"
          className={errors.password ? styles.inputError : styles.input}
          placeholder="Name"
          {...register('name')}
        />
        <p className={styles.error}>{errors?.name?.message}</p>
        <div className={styles.signUp}>
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
