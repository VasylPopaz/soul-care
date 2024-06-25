import {
  ref,
  get,
  limitToFirst,
  orderByKey,
  query,
  startAfter,
} from "firebase/database";

import { database } from "../firebase";

const LIMIT = 3;

export const getPsychologists = async (startKey: string | null) => {
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

export const getFavPsychologists = async (
  psychologistIds: string[],
  page: number
) => {
  const startIndex = (page - 1) * LIMIT;
  const endIndex = startIndex + LIMIT;

  const paginatedIds = psychologistIds.filter(
    (_, index) => index >= startIndex && index < endIndex
  );

  try {
    const promises = paginatedIds.map(async (id) => {
      const snapshot = await get(ref(database, `/psyhologists/items/${id}`));
      if (snapshot.exists()) {
        return { id, ...snapshot.val() };
      }
    });

    const favoritePsychologists = await Promise.all(promises);

    return favoritePsychologists;
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
