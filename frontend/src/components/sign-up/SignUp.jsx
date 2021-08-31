import styles from './sign-up.module.scss';

const SignUp = ({ register, errors }) => (
  <div>
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
  </div>
);

export default SignUp;
