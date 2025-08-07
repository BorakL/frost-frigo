import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // your config here
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      console.log("Signed in:", user);
    })
    .catch(error => {
      console.error("Error during sign-in:", error);
    });
}

export default signInWithGoogle;