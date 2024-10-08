import { get, ref, set } from "firebase/database";

import { database } from "../firebase";
import type { Appointment } from "../types";

interface UserData {
  name: string;
  email: string;
}
export const createUser = async (userId: string, userData: UserData) => {
  try {
    const userRef = ref(database, `/users/${userId}`);

    await set(userRef, userData);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getFavorites = async (userId: string) => {
  try {
    const favoritesRef = ref(database, `/users/${userId}/favorites`);
    const snapshot = await get(favoritesRef);

    if (!snapshot.exists()) {
      return [];
    }

    const favorites = snapshot.val();
    return favorites;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const addFavorites = async (userId: string, items: string[]) => {
  try {
    const favoritesRef = ref(database, `/users/${userId}/favorites`);
    await set(favoritesRef, items);
  } catch (e) {
    console.error("Error adding to favorites:", e);
    throw e;
  }
};

export const createAppointment = async (
  userId: string,
  appointment: Appointment
) => {
  try {
    const appointmentsRef = ref(database, `/users/${userId}/appointment`);
    await set(appointmentsRef, appointment);
  } catch (e) {
    console.error("Error adding appointment:", e);
    throw e;
  }
};

export const createAppointmentWithoutSignIn = async (
  id: string,
  appointment: Appointment
) => {
  try {
    const appointmentsRef = ref(database, `/appointments/${id}`);
    await set(appointmentsRef, appointment);
  } catch (e) {
    console.error("Error adding appointment:", e);
    throw e;
  }
};
