import { auth } from "../config/firebase.js";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const name = result.user.displayName;
    const email = result.user.email;
    return { name: name, email: email };
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const signUpLocal = async (name, email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, {
      displayName: name,
    });
    return true;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const logInLocal = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const name = user.displayName;
    return { name: name, email: email };
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const logOut = async () => {
  await signOut(auth);
};
