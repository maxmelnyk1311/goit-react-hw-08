import { useSelector } from "react-redux";

import { selectFilteredContacts } from "../../redux/contacts/contactsSlice.js";

import Contact from "./Contact/Contact.jsx";
import css from "./ContactList.module.css";

export default function ContactList() {
    const filteredContacts = useSelector(selectFilteredContacts);

    return (
        <ul className={css.contactList}>
            {filteredContacts.map((contact) => {
                return (
                    <Contact 
                        key={contact.id} 
                        contact={contact}
                    />            
                )
            })}
        </ul>
    )
}