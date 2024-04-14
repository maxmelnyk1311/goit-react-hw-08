// import { useSelector } from "react-redux"
import css from './UserMenu.module.css';
import { selectUser } from '../../../redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../redux/auth/operations.js';
export default function UserMenu() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    return (
        <div className={css.userMenu}>
            <p>Wellcome, {user.name}</p>
            <button 
                type="button"
                onClick={() => dispatch(logOut())}
            >
                Logout
            </button>
      </div>
    )
}