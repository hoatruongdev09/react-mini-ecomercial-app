import { useState } from "react";

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component'
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };
    const clearFields = () => {
        setFormFields({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, { displayName });
            clearFields()
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="sign-up-container">
            <h2>Don't have an account ?</h2>
            <span>Sign up with email & password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    required
                    type="text"
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                    label="Display Name:"
                />

                <FormInput
                    required
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                    label="Email:"
                />
                <FormInput
                    required
                    type="password"
                    onChange={handleChange}
                    name="password"
                    value={password}
                    label="Password:"
                />
                <FormInput
                    required
                    type="password"
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    label="Confirm Password:"
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
