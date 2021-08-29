import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import styles from './login-page.module.scss';
import { registerUser } from '../../store/reducers/register/registerReducer';

const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).max(12).required(),
  name: yup.string().required(),
});

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(LoginSchema),
  });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };
  return (
    <>
      <form>
        <div className={styles.pageWrapper}>
          <div className={styles.page}>
            <div className={styles.title}>Sign in</div>
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
            <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
              Login
            </Button>
            <div className={styles.signUp}>
              Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
            </div>
          </div>
        </div>
      </form>
      <button type="button" onClick={handleSubmit((data) => console.log(data))}>
        11
      </button>
    </>
  );
};

export default LoginPage;
