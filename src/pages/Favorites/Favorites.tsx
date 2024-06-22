import { useEffect, useState } from "react";

import { Filter, Loader, PsychologistsList } from "../../components";

import { useUser } from "../../hooks";
import { Psychologist } from "../../types";
import { getSortedItems } from "../../helpers";
import { getFavorites, getPsychologistsById } from "../../api";

const Favorites = () => {
  const { currentUser } = useUser();
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (currentUser) {
      getFavorites(currentUser.uid).then((res) => {
        getPsychologistsById(res)
          .then(setPsychologists)
          .finally(() => setIsLoading(false));
      });
    }
  }, [currentUser]);

  const handleFilterChange = (value: string) => {
    setSortBy(value);
  };
  const onFavClick = (items: Psychologist[]) => {
    setPsychologists(items);
  };

  if (isLoading) return <Loader />;

  const sortedPsychologists = getSortedItems(psychologists, sortBy);

  return (
    <section className="pt-[64px] pb-[100px]">
      <div className="container">
        {!psychologists.length ? (
          <h2 className="title">
            Your list of favorite psychologists is empty.
          </h2>
        ) : (
          <>
            <Filter onChange={handleFilterChange} />
            <PsychologistsList
              psychologists={sortedPsychologists}
              onFavClick={onFavClick}
              favPage
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Favorites;
