import { Psychologist } from "../types";

export const getSortedItems = (items: Psychologist[], sortBy: string) => {
  if (!sortBy) return items;
  const [key, order] = sortBy.split("=");

  const sortOrder = order === "true" ? 1 : -1;
  const sortKey: keyof Psychologist = key.toLowerCase() as keyof Psychologist;

  return [...items].sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder * valueA.localeCompare(valueB);
    } else if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder * (valueA - valueB);
    } else {
      return 0;
    }
  });
};
