import { useEffect, useState } from "react";

import { Filter, Loader, PsyhologistsList } from "../../components";

import { useUser } from "../../hooks";
import { Psyhologist } from "../../types";
import { getSortedItems } from "../../helpers";
import { getFavorites, getPsychologistsById } from "../../api";

const Favorites = () => {
  const { currentUser } = useUser();
  const [psyhologists, setPsyhologists] = useState<Psyhologist[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (currentUser) {
      getFavorites(currentUser.uid).then((res) => {
        console.log("favID", res);
        getPsychologistsById(res)
          .then(setPsyhologists)
          .finally(() => setIsLoading(false));
      });
    }
  }, [currentUser]);

  const handleFilterChange = (value: string) => {
    setSortBy(value);
  };
  if (isLoading) return <Loader />;

  const sortedPsyhologists = getSortedItems(psyhologists, sortBy);

  return (
    <section className="pt-[64px] pb-[100px]">
      <div className="container">
        {!psyhologists.length ? (
          <h1 className="title">Your don't have favorites psyhologists.</h1>
        ) : (
          <>
            <Filter onChange={handleFilterChange} />
            <PsyhologistsList psyhologists={sortedPsyhologists} />
          </>
        )}
      </div>
    </section>
  );
};

export default Favorites;
