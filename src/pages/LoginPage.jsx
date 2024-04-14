import { useSelector } from "react-redux";
import LoginForm from "../components/LoginForm/LoginForm";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { selectError, selectLoading } from "../redux/auth/selectors";



export default function LoginPage() {
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    return (
        <>
            <LoginForm />
            {loading && <Loader />}
            {error && <ErrorMessage />}
        </>
        
    )
}