import { Psychologist } from "../types";

export const getSortedItems = (items: Psychologist[], sortBy: string) => {
  if (!sortBy) return items;
  const [key, order] = sortBy.split("=");

  const sortOrder = order === "true" ? 1 : -1;

  return [...items].sort((a, b) => {
    const valueA = a[key as keyof Psychologist];
    const valueB = b[key as keyof Psychologist];
    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder * valueA.localeCompare(valueB);
    } else if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder * (valueA - valueB);
    } else {
      return 0;
    }
  });
};
