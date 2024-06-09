import { PsyhologistsList, Filter } from "../../components";

import psyhologists from "../../assets/psychologists.json";

const Psyhologists = () => {
  return (
    <section className="pt-[64px] pb-[100px]">
      <div className="container">
        <Filter />
        <PsyhologistsList psyhologists={psyhologists} />
      </div>
    </section>
  );
};

export default Psyhologists;
