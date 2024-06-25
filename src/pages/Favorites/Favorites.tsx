import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  Filter,
  LoadMoreButton,
  Loader,
  PsychologistsList,
} from "../../components";

import { useUser } from "../../hooks";
import type { Psychologist } from "../../types";
import { getSortedItems } from "../../helpers";
import { getFavPsychologists, getFavorites } from "../../api";

const Favorites = () => {
  const { currentUser } = useUser();
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const LIMIT = 3;

  useEffect(() => {
    setIsLoading(true);
    if (currentUser) {
      getFavorites(currentUser.uid)
        .then((res) => {
          const totalItems = res.length;
          const isMoreItems = page * LIMIT < totalItems;

          setShowLoadMore(isMoreItems);

          if (!isMoreItems && totalItems > 3) {
            toast.info(`You have reached the end of the psyhologists list.`);
          }
          getFavPsychologists(res, page).then((data) => {
            setPsychologists((prev) => [...prev, ...data]);
          });
        })
        .catch((e) => {
          toast.error(e instanceof Error && e.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [currentUser, page]);

  const handleFilterChange = (value: string) => {
    setSortBy(value);
  };
  const onFavClick = (items: Psychologist[]) => {
    setPsychologists(items);
  };

  const handleLoadMoreClick = () => {
    setPage((prev) => prev + 1);
  };

  const sortedPsychologists = getSortedItems(psychologists, sortBy);

  if (isLoading && !psychologists.length) return <Loader />;

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
              isFavPage
            />
            {showLoadMore ? (
              <LoadMoreButton onClick={handleLoadMoreClick} />
            ) : null}
          </>
        )}
      </div>
    </section>
  );
};

export default Favorites;
