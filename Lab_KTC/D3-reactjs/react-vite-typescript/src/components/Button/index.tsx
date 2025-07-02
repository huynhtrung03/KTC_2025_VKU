import styles from './Button.module.css'

type GButtonProps = {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: 'primary' | 'outline';
}



const Button = ({label, leftIcon, rightIcon, type='primary'} : GButtonProps) => {
  return (
    <button className={`${styles.button} ${type==='outline' ? styles.btn_outline : ''}`}> <span>{leftIcon} {label}</span> {rightIcon}</button>
  )
}

export default Button


