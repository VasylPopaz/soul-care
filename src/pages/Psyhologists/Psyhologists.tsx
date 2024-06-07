import { Modal } from "../../components";

import { useModal } from "../../hooks";

const Psyhologists = () => {
  const [isOpenModal, toggleModal] = useModal();
  return (
    <section className="pt-[64px] pb-[100px]">
      <div className="container">
        <h1 className="font-inter-regular text-4xl ">Psychologists.Services</h1>
        <button onClick={toggleModal}>Open Modal</button>
        {isOpenModal && <Modal toggleModal={toggleModal}>qwe</Modal>}
      </div>
    </section>
  );
};

export default Psyhologists;
