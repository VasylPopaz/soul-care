import { useState } from "react";

import { PsyhologistsList, Filter, LoadMoreButton } from "../../components";

import psyhologists from "../../assets/psychologists.json";

const Psyhologists = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const isMoreItems = page < Math.ceil(psyhologists.length / itemsPerPage);

  const params = {
    page,
    limit: itemsPerPage,
  };
  const handleLoadMoreClick = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <section className="pt-[64px] pb-[100px]">
      <div className="container">
        <Filter />
        <PsyhologistsList psyhologists={psyhologists} params={params} />
        {isMoreItems ? <LoadMoreButton onClick={handleLoadMoreClick} /> : null}
      </div>
    </section>
  );
};

export default Psyhologists;
