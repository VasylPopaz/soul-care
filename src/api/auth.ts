import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";
import { createUser } from "./users";

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

    await createUser(user.uid, { name, email });
  } catch (e) {
    if (
      e instanceof Error &&
      e.message === "Firebase: Error (auth/email-already-in-use)."
    ) {
      throw new Error(`An account with email address ${email} already exists.`);
    } else {
      throw new Error("Something went wrong. Please try again later.");
    }
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    if (
      e instanceof Error &&
      e.message === "Firebase: Error (auth/invalid-credential)."
    ) {
      throw new Error("Email or password is incorrect.");
    } else {
      throw new Error("Something went wrong. Please try again later.");
    }
  }
};

export const signoutUser = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    throw new Error("Something went wrong. Please try again later.");
  }
};
