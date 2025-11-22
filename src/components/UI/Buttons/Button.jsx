import styles from './Button.module.css';

export default function Button({typeButton, onClick}) {

  return (
    <button onClick={onClick} className={styles[typeButton]} />
  )
};