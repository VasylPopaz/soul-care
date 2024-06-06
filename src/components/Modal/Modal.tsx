import ReactDOM from "react-dom";

import { useEscapeKeyClose } from "../../hooks";

interface ModalProps {
  children: React.ReactNode;
  toggleModal: () => void;
}

const modalRoot = document.querySelector("#modalRoot")!;

export const Modal = ({ children, toggleModal }: ModalProps) => {
  useEscapeKeyClose(toggleModal);

  const handleClickOnBackdrop = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="flex items-center justify-center fixed bg-[#191a15] bg-opacity-60 w-full h-full left-0 top-0 z-50"
      onClick={handleClickOnBackdrop}
    >
      <div className="relative rounded-xl bg-[#FBFBFB] p-16">
        <button
          type="button"
          onClick={toggleModal}
          className="absolute top-2.5 right-2.5"
        >
          X
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
