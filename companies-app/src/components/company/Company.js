import Button from '../UI/button/Button';
import classes from './company.module.scss';

const Company = ({prop, onDelete, index}) => {

    return (
        <div className={classes.company_wrapper}>
            <div className={classes.company_name}>
                <h2>{index+1}.{prop.name.length <= 6 ? prop.name : prop.name.substring(0, 6)+'...'}</h2>
            </div>
            <p>{prop.adress.length <= 10 ? prop.adress : prop.adress.substring(0, 10)+'...'}</p>
            <p>{prop.service.length <= 10 ? prop.service : prop.service.substring(0, 10)+'...'}</p>
            <p>{prop.employeesCount}</p>
            <p>{prop.description.length <= 10 ? prop.description : prop.description.substring(0, 10)+'...'}</p>
            <p>{prop.type.length <= 10 ? prop.type : prop.type.substring(0, 10)+'...'}</p>
            <Button onClick={(e) => onDelete(e)}>Delete</Button>
        </div>
    )
}

export default Company;