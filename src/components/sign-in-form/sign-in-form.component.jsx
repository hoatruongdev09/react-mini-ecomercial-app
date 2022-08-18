import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'
import {
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";


const formDefaultFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(formDefaultFields)
    const { email, password } = formFields


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormFields({
            ...formFields,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        loginWithEmailPassword(email, password)
    }

    const loginWithGoogle = async () => {
        try {
            await signInWithGooglePopup();
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                alert('incorrect password')
            }
        }
    };

    const loginWithEmailPassword = async (email, password) => {
        if (!email || !password) {
            return
        }
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password')
                    break
                case 'auth/user-not-found':
                    alert('user not found')
                    break
                default:
                    console.error(error)
            }

            console.error(error)
        }
    }

    return (
        <div className="sign-up-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email & password</span>
            <form onSubmit={handleSubmit}>
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
                <div className='buttons-container'>
                    <Button type="submit">SIGN IN</Button>
                    <Button type="button" buttonType='google' onClick={loginWithGoogle}>GOOGLE SIGN IN</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm

