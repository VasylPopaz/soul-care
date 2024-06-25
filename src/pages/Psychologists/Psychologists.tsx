import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  PsychologistsList,
  Filter,
  LoadMoreButton,
  Loader,
} from "../../components";

import type { Psychologist } from "../../types";
import { getSortedItems } from "../../helpers";
import { getPsychologists, getTotalPsychologists } from "../../api";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  const LIMIT = 3;

  useEffect(() => {
    setIsLoading(true);
    getTotalPsychologists()
      .then((res) => {
        const totalItems = res;
        const isMoreItems = page * LIMIT < totalItems;

        setShowLoadMore(isMoreItems);

        if (!isMoreItems) {
          toast.info(`You have reached the end of the psyhologists list.`);
        }

        getPsychologists(lastKey).then((data) => {
          const newPsychologists = data;

          if (newPsychologists.length) {
            setPsychologists((prev) => [...prev, ...newPsychologists]);
            setLastKey(newPsychologists[newPsychologists.length - 1].id);
          }
        });
      })
      .catch((e) => {
        toast.error(e instanceof Error && e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const handleLoadMoreClick = () => {
    setPage((prev) => prev + 1);
  };

  const handleFilterChange = (value: string) => {
    setSortBy(value);
  };

  if (isLoading && !psychologists.length) return <Loader />;

  const sortedPsychologists = getSortedItems(psychologists, sortBy);

  return (
    <section className="pt-[64px] pb-[100px]">
      <div className="container">
        <Filter onChange={handleFilterChange} />
        <PsychologistsList psychologists={sortedPsychologists} />
        {showLoadMore ? <LoadMoreButton onClick={handleLoadMoreClick} /> : null}
      </div>
    </section>
  );
};

export default Psychologists;
