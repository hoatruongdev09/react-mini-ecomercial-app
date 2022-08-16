import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

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
    </div>
  );
};

export default SignIn;
