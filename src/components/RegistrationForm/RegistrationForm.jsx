import {Formik, Form, Field, ErrorMessage} from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations.js";
import { useDispatch } from "react-redux";
import css from "./RegistrationForm.module.css";

export default function RegistrationForm() {
    const nameFieldId = useId();
    const emailFieldId = useId();
    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        email: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Less than 3 symbols").max(50, "No more than 50 symbols!").required("Name is required!"),
        email: Yup.string().min(3, "Less than 3 symbols").max(50, "No more than 50 symbols!").required("Email is required!"),
        password: Yup.string().min(7, "Less than 7 symbols").max(50,"No more than 50 symbols").required("Password is required!"),
    });
    const handleSubmit = (values, actions) => {
        dispatch(register(values));
        actions.resetForm();
    }

    return(
        <div className={css.registrationFormWrp}>
            <h3>Register your account!</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className={css.form}>
                    <label htmlFor={nameFieldId}>Username:</label>
                    <Field type="text" name="name" id={nameFieldId}/>
                    <ErrorMessage name="name" as="span" />

                    <label htmlFor={emailFieldId}>Email:</label>
                    <Field type="email" name="email" id={emailFieldId}/>
                    <ErrorMessage name="email" as="span" />

                    <label>Password:</label>
                    <Field type="password" name="password"/>
                    <ErrorMessage name="password" as="span" />

                    <button type="submit" className={css.submitBtn}>Submit registration</button>
                </Form>
            </Formik>
        </div>
    )
}