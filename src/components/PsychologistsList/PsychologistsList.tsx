import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { PsychologistsListItem } from "./PsychologistsListItem";

import { useUser } from "../../hooks";
import { addFavorites, getFavorites } from "../../api";
import type { PsychologistsListProps } from "../../types";

export const PsychologistsList: React.FC<PsychologistsListProps> = ({
  psychologists,
  isFavPage = false,
  onFavClick,
}) => {
  const { currentUser } = useUser();
  const [favoritesIds, setFavoritesIds] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser) {
      getFavorites(currentUser.uid).then(setFavoritesIds);
    }
  }, [currentUser]);

  const handleFavClick = async (id: string) => {
    if (!currentUser) return toast.info("Please sign in to add favorites.");

    const updatedFavorites = favoritesIds.includes(id)
      ? favoritesIds.filter((favId) => favId !== id)
      : [...favoritesIds, id];
    setFavoritesIds(updatedFavorites);

    if (isFavPage) {
      const filteredPsychologists = psychologists.filter((item) =>
        updatedFavorites.includes(item.id)
      );
      onFavClick && onFavClick(filteredPsychologists);
    }

    try {
      await addFavorites(currentUser.uid, updatedFavorites);
    } catch (error) {
      toast.error("Failed to update favorites. Please try again.");
    }
  };

  const listToDisplay = psychologists;

  return (
    <ul className="flex flex-wrap gap-[32px] md:justify-center md:w-[704px] lg:w-full mb-12 lg:mb-16">
      {listToDisplay.map((item, index) => (
        <PsychologistsListItem
          key={index}
          item={item}
          {...{ handleFavClick, favoritesIds }}
        />
      ))}
    </ul>
  );
};
