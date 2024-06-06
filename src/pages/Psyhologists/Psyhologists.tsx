import { Modal } from "../../components";

import { useModal } from "../../hooks";

const Psyhologists = () => {
  const [isOpenModal, toggleModal] = useModal();
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="font-inter-regular text-4xl ">Psychologists.Services</h1>
      <button onClick={toggleModal}>Open Modal</button>
      {isOpenModal && <Modal toggleModal={toggleModal}>qwe</Modal>}
    </div>
  );
};

export default Psyhologists;
