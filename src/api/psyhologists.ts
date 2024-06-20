import {
  get,
  limitToFirst,
  orderByKey,
  query,
  startAfter,
} from "firebase/database";

import { database, ref } from "../firebase";

export const getPsyhologists = async (startKey: string | null) => {
  const LIMIT = 3;
  try {
    const psychologistsRef = ref(database, "/psyhologists/items");
    let psychologistsQuery;

    if (startKey) {
      psychologistsQuery = query(
        psychologistsRef,
        orderByKey(),
        startAfter(startKey),
        limitToFirst(LIMIT)
      );
    } else {
      psychologistsQuery = query(
        psychologistsRef,
        orderByKey(),
        limitToFirst(LIMIT)
      );
    }

    const snapshot = await get(psychologistsQuery);
    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.val();
    const items = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    return items;
  } catch (e) {
    console.error("Error fetching psychologists:", e);
    throw e;
  }
};

export const getTotalPsychologists = async () => {
  try {
    const psychologistsRef = ref(database, "/psyhologists/totalItems");
    const totalItems = (await get(psychologistsRef)).val();
    return totalItems;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
