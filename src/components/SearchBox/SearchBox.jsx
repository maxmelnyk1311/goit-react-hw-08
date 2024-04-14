import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { changeFilter } from '../../redux/filter/filtersSlice.js';
import { selectNameFilter } from "../../redux/filter/selectors.js";

import css from './SearchBox.module.css';

export default function SearchBox() {
    const dispatch = useDispatch();
    const filterValue = useSelector(selectNameFilter);
    return (
        <div className={css.searchBoxWrap}>
            <p>Find contacts by name</p>
            <input 
                className={css.searchBoxInput}
                type="text" 
                value={filterValue}
                onChange={(event) => dispatch(changeFilter(event.target.value))}
            />
        </div>
    )
}