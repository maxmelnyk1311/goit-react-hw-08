import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { selectError, selectLoading } from "../redux/auth/selectors";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";

export default function RegisterPage() {
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    return (
        <>
            <RegistrationForm />
            {loading && <Loader />}
            {error && <ErrorMessage />}
        </>
    )
}