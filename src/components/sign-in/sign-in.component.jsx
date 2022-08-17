import { useEffect } from "react";

import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={(e) => logGoogleUser()}>
        Sign in with google popup
      </button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
