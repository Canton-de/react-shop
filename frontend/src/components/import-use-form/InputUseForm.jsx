import styles from './input-use-form.module.scss';

const InputUseForm = ({ register, name, error, type, ...rest }) => (
  <>
    <label htmlFor="name" className={styles.subtitle}>
      {name}
    </label>
    <input
      {...rest}
      id={name}
      type={type}
      className={error ? styles.inputError : styles.input}
      defaultValue={type === 'number' ? 0 : null}
      placeholder={name}
      {...register(name)}
    />
    <p className={styles.error}>{error?.message}</p>
  </>
);

export default InputUseForm;
