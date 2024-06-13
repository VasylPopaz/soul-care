import { useState } from "react";
import { toast } from "react-toastify";

import { PsyhologistsList, Filter, LoadMoreButton } from "../../components";

import { getSortedItems } from "../../helpers";

import psyhologists from "../../assets/psychologists.json";

const Psyhologists = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");

  const limit = 3;
  const isMoreItems = page < Math.ceil(psyhologists.length / limit);

  const handleLoadMoreClick = () => {
    setPage((prev) => prev + 1);
  };

  const handleFilterChange = (value: string) => {
    setSortBy(value);
  };

  const paginatedPsyhologists = psyhologists.filter(
    (item, index) => index < page * limit && item
  );
  const sortedPsyhologists = getSortedItems(paginatedPsyhologists, sortBy);

  return (
    <section className="pt-[64px] pb-[100px]">
      <div className="container">
        <Filter onChange={handleFilterChange} />
        <PsyhologistsList psyhologists={sortedPsyhologists} />
        {isMoreItems ? (
          <LoadMoreButton onClick={handleLoadMoreClick} />
        ) : (
          toast.info(
            `We are sorry, but you have reached the end of the psyhologists list.`
          )
        )}
      </div>
    </section>
  );
};

export default Psyhologists;
