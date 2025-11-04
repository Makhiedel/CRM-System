import styles from './Button.module.css';

export default function Button({nameButton, styleName, onClick}) {
  
  return (
    <button onClick={onClick} className={styles[styleName]}>
      {nameButton}
    </button>
  )
};