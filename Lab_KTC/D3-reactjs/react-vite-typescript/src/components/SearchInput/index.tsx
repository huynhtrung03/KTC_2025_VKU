import styles from './Search.module.css'
type ButtonProps = {
    label?: string;
    left_icon?: React.ReactNode;
    f_b?: boolean;
    right_icon?: React.ReactNode;
    border_icon?: "rec" | "cir";
    bg?: string;
};
const SearchInput = ({ label, left_icon, f_b, right_icon, border_icon = "cir", bg }: ButtonProps) => {
    return(
    <div className={styles.searchContainer}>
        <span className={styles.leftIcon}>
            {left_icon}
        </span>
        <input className={`${styles.input} ${f_b ? styles.fbold : ''}`} type="text" placeholder={label} />
        <div className={`${styles.rightIcon} ${border_icon === "rec" ? styles.brec : styles.bradius} ${bg ? styles[bg] : ''}` }>
            {right_icon}
        </div>
    </div>
    )
};
export default SearchInput