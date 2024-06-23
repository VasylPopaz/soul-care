import { useEffect, useState } from "react";

import {
  Filter,
  LoadMoreButton,
  Loader,
  PsychologistsList,
} from "../../components";

import { useUser } from "../../hooks";
import { Psychologist } from "../../types";
import { getSortedItems } from "../../helpers";
import { getFavorites, getPsychologistsById } from "../../api";

const Favorites = () => {
  const { currentUser } = useUser();
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [page, setPage] = useState(1);
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

  const handleLoadMoreClick = () => {
    setPage((prev) => prev + 1);
  };

  const LIMIT = 3;
  const isMoreItems = page < Math.ceil(psychologists.length / LIMIT);

  const paginatedPsychologists = psychologists.filter(
    (item, index) => index < page * LIMIT && item
  );

  const sortedPsychologists = getSortedItems(paginatedPsychologists, sortBy);

  if (isLoading) return <Loader />;

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
              isLoadMore
              isfavPage
            />
            {isMoreItems && <LoadMoreButton onClick={handleLoadMoreClick} />}
          </>
        )}
      </div>
    </section>
  );
};

export default Favorites;
