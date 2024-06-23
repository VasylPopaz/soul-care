import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { PsychologistsListItem } from "./PsychologistsListItem";

import { useUser } from "../../hooks";
import { addFavorites, getFavorites } from "../../api";
import { Psychologist, PsychologistsListProps } from "../../types";

export const PsychologistsList: React.FC<PsychologistsListProps> = ({
  psychologists,
  isLoadMore = false,
  isfavPage = false,
  onFavClick,
}) => {
  const { currentUser } = useUser();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesPsychologists, setFavoritesPsychologists] =
    useState<Psychologist[]>(psychologists);

  useEffect(() => {
    if (currentUser) {
      getFavorites(currentUser.uid).then(setFavorites);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isLoadMore) {
      setFavoritesPsychologists(psychologists);
    }
  }, [isLoadMore, psychologists]);

  const handleFavClick = async (id: string) => {
    if (!currentUser) return toast.info("Please sign in to add favorites.");

    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    if (isfavPage) {
      const filteredPsychologists = psychologists.filter((item) =>
        updatedFavorites.includes(item._id)
      );

      setFavoritesPsychologists(filteredPsychologists);
      onFavClick && onFavClick(filteredPsychologists);
    }

    try {
      await addFavorites(currentUser.uid, updatedFavorites);
    } catch (error) {
      toast.error("Failed to update favorites. Please try again.");
    }
  };

  const listToDisplay = isfavPage ? favoritesPsychologists : psychologists;

  return (
    <ul className="flex flex-wrap gap-[32px] md:justify-center md:w-[704px] lg:w-full mb-12 lg:mb-16">
      {listToDisplay.map((item, index) => (
        <PsychologistsListItem
          key={index}
          item={item}
          {...{ index, handleFavClick, favorites }}
        />
      ))}
    </ul>
  );
};
