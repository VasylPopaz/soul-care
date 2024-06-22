import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { PsyhologistsListItem } from "./PsyhologistsListItem";

import { useUser } from "../../hooks";
import { addFavorites, getFavorites } from "../../api";
import { PsyhologistsListProps } from "../../types";

export const PsyhologistsList: React.FC<PsyhologistsListProps> = ({
  psyhologists,
}) => {
  const { currentUser } = useUser();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser) {
      getFavorites(currentUser.uid).then(setFavorites);
    }
  }, [currentUser]);

  const handleFavClick = async (id: string) => {
    if (!currentUser) return toast.info("Please sign in to add favorites.");

    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);

    try {
      addFavorites(currentUser.uid, updatedFavorites).then(() => {
        getFavorites(currentUser.uid).then(setFavorites);
      });
    } catch (error) {
      toast.error("Failed to update favorites. Please try again.");
    }
  };

  return (
    <ul className="flex flex-wrap gap-[32px] md:justify-center md:w-[704px] lg:w-full mb-12 lg:mb-16">
      {psyhologists.map((item, index) => (
        <PsyhologistsListItem
          key={index}
          item={item}
          {...{ index, handleFavClick, favorites }}
        />
      ))}
    </ul>
  );
};
