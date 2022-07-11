import classes from './button.module.scss';

const Button = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    )
}

export default Button;