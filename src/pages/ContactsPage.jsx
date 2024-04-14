import ContactForm from "../components/ContactForm/ContactForm";
import SearchBox from "../components/SearchBox/SearchBox";
import ContactList from "../components/ContactList/ContactList";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { fetchContacts } from "../redux/contacts/operations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectError, selectLoading } from "../redux/auth/selectors";

export default function ContactsPage() {
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());

    }, [dispatch])
    return (
        <>
            <ContactForm />
            <SearchBox />
            <ContactList />
            {loading && <Loader />}
            {error && <ErrorMessage />}
      </>
    )
}