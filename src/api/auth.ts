import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    console.log("User registered successfully with name:", name);
  } catch (e) {
    throw new Error(`An account with email address ${email} already exists.`);
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (e) {
    throw new Error("Email or password is incorrect.");
  }
};

export const signoutUser = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    throw new Error("Something went wrong. Please try again later.");
  }
};

export const getCurrentUser = () => {
  const user = auth.currentUser;

  return user;
};
