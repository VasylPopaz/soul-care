import {
  ref,
  get,
  limitToFirst,
  orderByKey,
  query,
  startAfter,
} from "firebase/database";

import { database } from "../firebase";
import { Psyhologist } from "../types";

export const getPsyhologists = async (startKey: string | null) => {
  const LIMIT = 3;

  try {
    const psychologistsRef = ref(database, "/psyhologists/items");
    let psychologistsQuery;
    // if (sortBy) {
    //   console.log("sortBy");
    //   const [key, order] = sortBy.split("=");

    //   console.log(key);
    //   console.log(order);
    //   psychologistsQuery = query(
    //     psychologistsRef,
    //     orderByChild(key),
    //     startAfter(startKey),
    //     order === "true" ? limitToFirst(LIMIT) : limitToLast(LIMIT)
    //   );
    // } else {
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
    // }

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

export const getPsychologistsById = async (psychologistIds: string[]) => {
  try {
    // Ссылка на узел с психологами
    const psychologistsRef = ref(database, "/psyhologists/items");
    const snapshot = await get(psychologistsRef);

    if (snapshot.exists()) {
      const psychologists = snapshot.val();

      const filteredPsychologists = psychologists.filter(
        (psychologist: Psyhologist) =>
          psychologistIds.includes(psychologist._id)
      );
      return filteredPsychologists;
    } else {
      return [];
    }
  } catch (e) {
    console.error("Error fetching psychologists:", e);
    throw e;
  }
};
