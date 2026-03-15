import styles from './Button.module.css';

export default function Button({typeButton, onClick}:{typeButton:string, onClick:any}) {

  return (
    <button onClick={onClick} className={styles[typeButton]} />
  )
};