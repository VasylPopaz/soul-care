import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  PsychologistsList,
  Filter,
  LoadMoreButton,
  Loader,
} from "../../components";

import { Psychologist } from "../../types";
import { getSortedItems } from "../../helpers";
import { getPsychologists, getTotalPsychologists } from "../../api";

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    const fetchPsyhologists = async () => {
      try {
        setIsLoading(true);
        const totalItems = await getTotalPsychologists();

        const isMoreItems = page * 3 < totalItems;

        setShowLoadMore(isMoreItems);

        if (!isMoreItems) {
          toast.info(
            `We are sorry, but you have reached the end of the psyhologists list.`
          );
        }

        const newPsychologists = await getPsychologists(lastKey);
        if (newPsychologists.length) {
          setPsychologists((prev) => [...prev, ...newPsychologists]);
          setLastKey(newPsychologists[newPsychologists.length - 1].id);
        }
      } catch (e) {
        toast.error(e instanceof Error && e.message);
      }
      setIsLoading(false);
    };

    fetchPsyhologists();
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
