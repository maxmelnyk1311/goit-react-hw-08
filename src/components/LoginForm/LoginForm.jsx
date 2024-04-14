import {Formik, Form, Field} from "formik";
import { useId } from "react";
import {Link} from "react-router-dom";
import { logIn } from "../../redux/auth/operations.js";
import { useDispatch } from "react-redux";

import css from "./LoginForm.module.css";

export default function LoginForm() {
    const emailFieldId = useId();
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        password: "",
    };

    const handleSubmit = (values, actions) => {
        dispatch(logIn(values));
        actions.resetForm();
    }

    return(
        <div className={css.loginFormWrp}>
            <p>Please log in</p>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                <Form className={css.form}>
                    <label htmlFor={emailFieldId}>Email:</label>
                    <Field type="email" name="email" id={emailFieldId}/>
                    
                    <label>Password:</label>
                    <Field type="password" name="password"/>
                    
                    <button type="submit" className={css.submitBtn}>Submit login and password</button>
                </Form>
            </Formik>
            <p>You have no account? <Link to="/register">Register here!</Link></p>
        </div>
    )
}