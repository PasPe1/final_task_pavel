import classes from './input.module.scss';

const Input = (props) => {
    return (
        <input className={classes.myInput} {...props}/>
    )
}

export default Input;