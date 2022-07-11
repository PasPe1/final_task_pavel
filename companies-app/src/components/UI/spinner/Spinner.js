
import classes from './spinner.module.scss';

const Spinner = () => {
    return (
        <div className={classes.spinner_roll} role="status">
            <span className="visually-hidden">Lo<img className={classes.spinner_img} src={'https://galshir.com/img/brushes/gal-shir-brushes-before.jpg'} alt='spinner loading'/>ding...</span>
        </div>
    )
}

export default Spinner;