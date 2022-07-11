import { useCallback } from 'react';
import Button from '../button/Button';
import classes from './pagination.module.scss';

const Pagination = ({postsPerPage, length, setCurrentPage, currentPage}) => {

    const handlerCurrentPage = useCallback(event => {
        setCurrentPage(+(event.target.innerHTML))
      }, [setCurrentPage])
    
    const renderPagination = (postsPerPage, length) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <nav>
                <ul className={classes.pagination}>
                    {pageNumbers.map(number => (
                    <li key={number} className={number !== currentPage ? classes.pagination_item : classes.pagination_item_active}>
                        <Button onClick={(e) => handlerCurrentPage(e)}>{number}</Button>
                    </li>
                    ))}
                </ul>
            </nav>
        )
    }

    return (
        <>
        {renderPagination(postsPerPage, length, setCurrentPage)}
        </>
    )
}

export default Pagination;