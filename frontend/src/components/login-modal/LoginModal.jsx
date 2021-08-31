import { useState, useEffect } from 'react';
import Modal from 'antd/lib/modal/Modal';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Radio } from 'antd';
import { registerUser } from '../../store/reducers/register/registerReducer';
import SignUp from '../sign-up/SignUp';
import SignIn from '../sign-in/SignIn';
import styles from './login-modal.module.scss';
import { loginUser } from '../../store/reducers/login/actions';

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
  const { isRegistrating } = useSelector((state) => state.register);
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
    setConfirmLoading(true);
    dispatch(registerUser(data));
  };
  const handleSignIn = (data) => {
    setConfirmLoading(true);
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (!isRegistrating) {
      setConfirmLoading(false);
      handleCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegistrating]);

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
        okText={signType === 'sign-up' ? 'Зарегестрироваться' : 'Войти'}
        cancelText="Закрыть"
      >
        {signType === 'sign-up' ? (
          <SignUp register={signUp} errors={signUpErrors} />
        ) : (
          <SignIn register={signIn} errors={signInErrors} />
        )}
      </Modal>
    </>
  );
};

export default LoginModal;
