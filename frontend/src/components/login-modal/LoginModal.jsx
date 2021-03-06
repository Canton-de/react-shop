import { useState, useEffect } from 'react';
import Modal from 'antd/lib/modal/Modal';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'antd';
import SignUp from '../sign-up/SignUp';
import SignIn from '../sign-in/SignIn';
import styles from './login-modal.module.scss';
import { loginUser, setLoginModal } from '../../store/reducers/login/actions';
import { registerUser, setServerErrors } from '../../store/reducers/register/actions';

const SignUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).max(12).required(),
  name: yup.string().required(),
});

const SignInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).max(12).required(),
});
const LoginModal = ({ handleCancel, isOpen }) => {
  const { serverErrors } = useSelector((state) => state.register);
  const { isLogged } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [signType, setSignType] = useState('sign-in');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {
    handleSubmit: handleSignUpSubmit,
    register: signUp,
    formState: { errors: signUpErrors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(SignUpSchema),
  });
  const {
    handleSubmit: handleSignInSumbit,
    register: signIn,
    formState: { errors: signInErrors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(SignInSchema),
  });
  const handleSignUp = (data) => {
    dispatch(registerUser(data));
    setConfirmLoading(true);
  };
  const handleSignIn = (data) => {
    setConfirmLoading(true);
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (serverErrors) {
      setConfirmLoading(false);
      setServerErrors(null);
      setLoginModal(true);
    }
  }, [serverErrors]);
  useEffect(() => {
    if (isLogged) {
      setConfirmLoading(false);
      handleCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  return (
    <>
      <Modal
        confirmLoading={confirmLoading}
        visible={isOpen}
        title={
          <div className={styles['sign-type']}>
            <Radio.Group onChange={(e) => setSignType(e.target.value)} defaultValue="sign-in" buttonStyle="solid">
              <Radio.Button value="sign-in">Sign In</Radio.Button>
              <Radio.Button value="sign-up">Sign Up</Radio.Button>
            </Radio.Group>
          </div>
        }
        onCancel={handleCancel}
        onOk={
          signType === 'sign-up'
            ? handleSignUpSubmit((data) => handleSignUp(data))
            : handleSignInSumbit((data) => handleSignIn(data))
        }
        okText={signType === 'sign-up' ? '????????????????????????????????????' : '??????????'}
        cancelText="??????????????"
      >
        {serverErrors && <div className={styles['server-errors']}>{serverErrors}</div>}
        {signType === 'sign-up' ? (
          <SignUp register={signUp} errors={signUpErrors} />
        ) : (
          <SignIn register={signIn} errors={signInErrors} />
        )}
        <div>Admin login: admin@mail.ru</div>
        <div>Admin password: admin</div>
      </Modal>
    </>
  );
};

export default LoginModal;
