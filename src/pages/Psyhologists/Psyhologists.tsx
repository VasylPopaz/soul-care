import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { PsyhologistsList, Filter, LoadMoreButton } from "../../components";

import { getSortedItems } from "../../helpers";
import { getPsyhologists, getTotalPsychologists } from "../../api";
import { Psyhologist } from "../../types";

const Psyhologists = () => {
  const [psyhologists, setPsyhologists] = useState<Psyhologist[]>([]);
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

        const newPsyhologists = await getPsyhologists(lastKey);
        if (newPsyhologists.length > 0) {
          setPsyhologists((prev) => [...prev, ...newPsyhologists]);
          setLastKey(newPsyhologists[newPsyhologists.length - 1].id);
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

  if (isLoading && !psyhologists.length) return <h1>Loading</h1>;

  const sortedPsyhologists = getSortedItems(psyhologists, sortBy);

  return (
    <section className="pt-[64px] pb-[100px]">
      <div className="container">
        <Filter onChange={handleFilterChange} />
        <PsyhologistsList psyhologists={sortedPsyhologists} />
        {showLoadMore ? <LoadMoreButton onClick={handleLoadMoreClick} /> : null}
      </div>
    </section>
  );
};

export default Psyhologists;
